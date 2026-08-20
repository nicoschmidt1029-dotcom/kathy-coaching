import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const baseUrl = process.env.AUDIT_BASE_URL ?? "https://kateycoaching.com";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const adminEmail = process.env.AUDIT_ADMIN_EMAIL ?? "nicoschmidt1029@gmail.com";

if (!serviceKey || !supabaseUrl) {
  throw new Error("SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL are required.");
}

const outputDir = ".shots/admin-audit";
await mkdir(outputDir, { recursive: true });
const supabase = createClient(supabaseUrl, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const publicRoutes = [
  "/en", "/en/katey", "/en/mission", "/en/programme", "/en/recipes", "/en/kontakt",
  "/de", "/de/katey", "/de/mission", "/de/programme", "/de/recipes", "/de/kontakt",
  "/sk", "/sk/katey", "/sk/mission", "/sk/programme", "/sk/recipes", "/sk/kontakt",
];
const adminRoutes = [
  "/admin", "/admin/programs", "/admin/programs/new", "/admin/recipes",
  "/admin/recipes/new", "/admin/website", "/admin/media",
];
const allViewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
];
const viewports = process.env.AUDIT_MOBILE_ONLY === "1" ? [allViewports[0]] : allViewports;

const browser = await chromium.launch();
const results = [];

async function inspect(page, route, area, viewportName) {
  const errors = [];
  const onConsole = (message) => message.type() === "error" && errors.push(`console: ${message.text()}`);
  const onPageError = (error) => errors.push(`page: ${error.message}`);
  page.on("console", onConsole);
  page.on("pageerror", onPageError);
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded", timeout: 30_000 });
  await page.waitForTimeout(350);
  const layout = await page.evaluate(() => ({
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  results.push({ area, viewport: viewportName, route, status: response?.status() ?? null, finalPath: new URL(page.url()).pathname, ...layout, errors });
  page.off("console", onConsole);
  page.off("pageerror", onPageError);
}

for (const viewport of viewports) {
  const publicContext = await browser.newContext({ viewport });
  const publicPage = await publicContext.newPage();
  for (const route of publicRoutes) await inspect(publicPage, route, "public", viewport.name);
  await publicContext.close();

  const { data, error } = await supabase.auth.admin.generateLink({
    type: "magiclink",
    email: adminEmail,
    options: { redirectTo: `${baseUrl}/admin/auth/confirm` },
  });
  if (error || !data.properties.hashed_token) throw error ?? new Error("No admin token returned.");

  const adminContext = await browser.newContext({ viewport });
  const adminPage = await adminContext.newPage();
  await adminPage.goto(`${baseUrl}/admin/auth/confirm?token_hash=${encodeURIComponent(data.properties.hashed_token)}&type=magiclink`, { waitUntil: "networkidle" });
  if (new URL(adminPage.url()).pathname !== "/admin") {
    throw new Error(`Admin authentication failed at ${adminPage.url()}`);
  }
  for (const route of adminRoutes) {
    await inspect(adminPage, route, "admin", viewport.name);
    await adminPage.screenshot({ path: `${outputDir}/${viewport.name}-${route.replaceAll("/", "-").replace(/^-/, "")}.png`, fullPage: false });
  }
  await adminPage.goto(`${baseUrl}/admin`, { waitUntil: "networkidle" });
  await adminPage.getByRole("button", { name: /Tutorials/i }).click();
  await adminPage.screenshot({ path: `${outputDir}/${viewport.name}-tutorials.png`, fullPage: false });
  const tutorialVideos = adminPage.locator('video');
  const tutorialCount = await tutorialVideos.count();
  const firstVideo = tutorialVideos.first();
  await firstVideo.evaluate((video) => video.play());
  await adminPage.waitForTimeout(600);
  const tutorialPlayback = await firstVideo.evaluate((video) => ({ currentTime: video.currentTime, error: video.error?.message ?? null }));
  results.push({ area: "admin", viewport: viewport.name, route: "tutorials", status: 200, finalPath: "/admin", horizontalOverflow: false, scrollWidth: viewport.width, clientWidth: viewport.width, errors: tutorialCount === 4 && tutorialPlayback.currentTime > 0 && !tutorialPlayback.error ? [] : [`Tutorial check failed: count=${tutorialCount}, time=${tutorialPlayback.currentTime}, error=${tutorialPlayback.error}`] });

  const recovery = await supabase.auth.admin.generateLink({ type: "recovery", email: adminEmail, options: { redirectTo: `${baseUrl}/admin/password/setup` } });
  if (recovery.error || !recovery.data.properties.hashed_token) throw recovery.error ?? new Error("No recovery token returned.");
  await adminPage.goto(`${baseUrl}/admin/password/setup?token_hash=${encodeURIComponent(recovery.data.properties.hashed_token)}`, { waitUntil: "networkidle" });
  await adminPage.getByRole("button", { name: /Weiter und Passwort wählen/i }).click();
  await adminPage.waitForURL(/\/admin\/set-password/);
  results.push({ area: "admin", viewport: viewport.name, route: "password-setup", status: 200, finalPath: new URL(adminPage.url()).pathname, horizontalOverflow: false, scrollWidth: viewport.width, clientWidth: viewport.width, errors: new URL(adminPage.url()).pathname === "/admin/set-password" ? [] : ["Recovery confirmation did not reach password form"] });
  await adminContext.close();
}

await browser.close();
const failures = results.filter((result) => result.status !== 200 || result.horizontalOverflow || result.errors.length || (result.area === "admin" && !result.finalPath.startsWith("/admin")));
console.log(JSON.stringify({ checked: results.length, failures, results }, null, 2));
if (failures.length) process.exitCode = 1;
