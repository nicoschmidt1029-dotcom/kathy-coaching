/**
 * Screenshot the running dev/preview server with Playwright (Chromium).
 *
 * Prereqs:
 *   1. Start the app in another terminal:  npm run dev
 *   2. First time only, install the browser: npx playwright install chromium
 *
 * Usage:
 *   npm run screenshot                       # "/" at lg + xl
 *   npm run screenshot -- about programme    # specific routes (leading slash optional;
 *                                            #   omit it on Git Bash to avoid path munging)
 *   SHOT_URL=http://localhost:3111 npm run screenshot
 *   SHOT_WIDTHS=390,1024,1440 npm run screenshot -- /
 *   SHOT_FULL=1 npm run screenshot -- about   # whole page, not just the fold
 *   SHOT_SETTLE=2000 npm run screenshot       # extra ms before the shot
 *
 * Output: .shots/<route>-<width>.png  (git-ignored)
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = (process.env.SHOT_URL ?? "http://localhost:3000").replace(/\/$/, "");
const WIDTHS = (process.env.SHOT_WIDTHS ?? "1024,1440")
  .split(",")
  .map((w) => parseInt(w.trim(), 10))
  .filter((w) => Number.isFinite(w) && w > 0);
const FULL_PAGE = ["1", "true", "yes"].includes(
  (process.env.SHOT_FULL ?? "").toLowerCase()
);
const SETTLE_MS = Number(process.env.SHOT_SETTLE ?? 1000);
const ROUTES = process.argv.slice(2).filter((a) => !a.startsWith("-"));
const routes = ROUTES.length ? ROUTES : ["/"];
const OUT = ".shots";

const slug = (route) =>
  route.replace(/^\/+|\/+$/g, "").replace(/\//g, "-") || "home";
const toUrl = (route) => BASE + (route.startsWith("/") ? route : "/" + route);

async function ensureReachable() {
  try {
    const res = await fetch(toUrl(routes[0]), { method: "HEAD" });
    if (!res.ok && res.status >= 500) throw new Error(`HTTP ${res.status}`);
  } catch (err) {
    console.error(
      `\nCannot reach ${BASE}. Is the dev server running? (npm run dev)\n${err.message}\n`
    );
    process.exit(1);
  }
}

/**
 * Wait for what a screenshot actually depends on: web fonts decoded and
 * images decoded. Without this, dropping networkidle would trade flakiness
 * for fallback type and half-empty image frames.
 *
 * Each wait is capped and failure-tolerant — a single stuck image should
 * cost a blurry corner, not the whole run.
 */
async function waitForPaintable(page) {
  await page
    .evaluate(() => document.fonts?.ready)
    .catch(() => {});
  await page
    .waitForFunction(
      () =>
        Array.from(document.images).every((img) => img.complete || !img.src),
      undefined,
      { timeout: 15_000 }
    )
    .catch(() => {});
}

await ensureReachable();
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
try {
  for (const width of WIDTHS) {
    const page = await browser.newPage({
      viewport: { width, height: Math.round(width * 0.66) },
      deviceScaleFactor: 2,
    });
    for (const route of routes) {
      const url = toUrl(route);
      /*
       * domcontentloaded, not networkidle. Against the live deployment
       * networkidle regularly never fires — something keeps a connection warm
       * and the run dies on a 60s timeout — while the page itself has been
       * ready for seconds. So: navigate, then wait for the things that
       * actually affect a screenshot.
       */
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 });
      await waitForPaintable(page);
      await sleep(SETTLE_MS); // let entrance animations settle
      const file = `${OUT}/${slug(route)}-${width}.png`;
      await page.screenshot({ path: file, fullPage: FULL_PAGE });
      console.log(`✓ ${file}  (${url})`);
    }
    await page.close();
  }
} finally {
  await browser.close();
}
console.log("done");
