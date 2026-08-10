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
 *   SHOT_SCALE=1 npm run screenshot           # 1x instead of retina, ~4x smaller files
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
/** Retina by default — drop to 1 when the files have to be small enough to send. */
const SCALE = Number(process.env.SHOT_SCALE ?? 2);
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
/**
 * Walk the page top to bottom, then back up, before a full-page capture.
 *
 * next/image lazy-loads anything below the fold. Without this the readiness
 * check passes — those images have not started loading, so nothing is
 * pending — and the capture shows empty frames for every picture past the
 * first screen. That misreads as a broken page.
 */
async function scrollThrough(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 200));
  });
}

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
      deviceScaleFactor: SCALE,
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
      if (FULL_PAGE) await scrollThrough(page);
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
