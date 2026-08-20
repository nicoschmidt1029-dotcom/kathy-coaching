import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";
import { createClient } from "@supabase/supabase-js";

const baseUrl = process.env.TUTORIAL_BASE_URL ?? "https://kateycoaching.com";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const adminEmail = process.env.TUTORIAL_ADMIN_EMAIL ?? "nicoschmidt1029@gmail.com";
const outputDir = ".shots/admin-tutorials";

if (!serviceKey || !supabaseUrl) throw new Error("Supabase audit credentials are required.");
await mkdir(outputDir, { recursive: true });

const supabase = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
const browser = await chromium.launch();

async function caption(page, text) {
  await page.evaluate((value) => {
    document.querySelector("#tutorial-caption")?.remove();
    const element = document.createElement("div");
    element.id = "tutorial-caption";
    element.textContent = value;
    Object.assign(element.style, {
      position: "fixed", left: "50%", bottom: "24px", transform: "translateX(-50%)",
      zIndex: "9999", width: "min(760px, calc(100% - 40px))", padding: "14px 20px",
      borderRadius: "16px", background: "rgba(27,46,61,.94)", color: "#fff",
      font: "500 17px/1.45 Arial, sans-serif", textAlign: "center",
      boxShadow: "0 18px 50px rgba(0,0,0,.25)", pointerEvents: "none",
    });
    document.body.appendChild(element);
    document.querySelector("aside p")?.setAttribute("style", "visibility:hidden");
  }, text);
  await page.waitForTimeout(1700);
}

async function route(page, path, text) {
  await page.goto(`${baseUrl}${path}`, { waitUntil: "networkidle" });
  await caption(page, text);
}

async function record(name, walkthrough) {
  const { data, error } = await supabase.auth.admin.generateLink({ type: "magiclink", email: adminEmail, options: { redirectTo: `${baseUrl}/admin/auth/confirm` } });
  if (error || !data.properties.hashed_token) throw error ?? new Error("Tutorial login token unavailable.");
  const context = await browser.newContext({ viewport: { width: 1280, height: 720 }, recordVideo: { dir: outputDir, size: { width: 1280, height: 720 } } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/admin/auth/confirm?token_hash=${encodeURIComponent(data.properties.hashed_token)}&type=magiclink`, { waitUntil: "networkidle" });
  if (new URL(page.url()).pathname !== "/admin") throw new Error(`Tutorial authentication failed: ${page.url()}`);
  await walkthrough(page);
  const video = page.video();
  await context.close();
  await video.saveAs(`${outputDir}/${name}.webm`);
}

await record("overview", async (page) => {
  await caption(page, "Welcome to the Katey Coaching Admin. Choose the area you want to update from the dashboard or side menu.");
  await page.getByRole("link", { name: /Programs/ }).first().hover();
  await caption(page, "Programs, Recipes, Website Content and Media are separate, so it is difficult to change the wrong part of the site.");
  await caption(page, "Use Save draft while you are working. Choose Save & publish only when the content is ready for visitors.");
});

await record("programs", async (page) => {
  await route(page, "/admin/programs", "Open an existing program to edit it, or choose Add program to create a new offer.");
  await page.locator('a[href="/admin/programs/training-only"]').click();
  await page.waitForLoadState("networkidle");
  await caption(page, "Price, display order, contact destination and the program image are managed at the top.");
  await page.locator("fieldset").first().scrollIntoViewIfNeeded();
  await caption(page, "Add the title, description and features in English, German and Slovak. The website layout stays protected.");
  await page.locator('button[name="status"][value="published"]').scrollIntoViewIfNeeded();
  await caption(page, "Save a draft to continue later, or publish when all language versions have been checked.");
});

await record("recipes", async (page) => {
  await route(page, "/admin/recipes", "The recipe list shows what is published, saved as a draft, or still using the original website content.");
  await page.getByRole("link", { name: /Add recipe/ }).click();
  await page.waitForLoadState("networkidle");
  await caption(page, "Start with a short URL slug, choose a category and upload one strong food image.");
  await page.locator("fieldset").first().scrollIntoViewIfNeeded();
  await caption(page, "For each language, add the title, introduction, timings, ingredients and method. Put one ingredient or step on each line.");
  await page.locator('button[name="status"][value="published"]').scrollIntoViewIfNeeded();
  await caption(page, "Review the recipe, then save it as a draft or publish it to the public recipe journal.");
});

await record("content-media", async (page) => {
  await route(page, "/admin/website", "Website Content contains only selected text and images. Design, navigation and legal pages cannot be changed here.");
  await page.locator("details").first().scrollIntoViewIfNeeded();
  await caption(page, "Open the section you need, replace its image if necessary, and update each language version.");
  await route(page, "/admin/media", "Media gives you a visual overview of images uploaded through Programs, Recipes and Website Content.");
  await caption(page, "Uploaded images automatically keep the crop, size and rounded-corner rules defined by the website design.");
});

await browser.close();
console.log("Recorded four admin tutorials.");
