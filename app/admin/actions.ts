"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RECIPE_CATEGORIES } from "@/lib/recipes";
import { PROGRAMS } from "@/lib/programs";
import { requireAdmin, isAllowedAdminEmail } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/site-url";
import { routing } from "@/i18n/routing";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { EDITORIAL_SECTION_FIELDS, type EditorialSectionKey } from "@/lib/admin-section-fields";
import { saveAdminPreview } from "@/lib/admin-preview";

const value = (form: FormData, name: string) =>
  String(form.get(name) ?? "").trim();
const rawValue = (form: FormData, name: string) =>
  String(form.get(name) ?? "");
const lines = (form: FormData, name: string) =>
  value(form, name)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
const slugify = (input: string) =>
  input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
const imageValue = (form: FormData) => {
  const image = value(form, "image_path");
  if (!image) return null;
  const storagePrefix = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/site-media/`;
  if (image.startsWith(storagePrefix) || image.startsWith("/images/")) return image;
  throw new Error("Invalid image source.");
};
const assertContentSize = (data: unknown) => {
  if (JSON.stringify(data).length > 200_000) throw new Error("Content is too large.");
};

function revalidatePublicContent() {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}`);
    revalidatePath(`/${locale}/recipes`);
    revalidatePath(`/${locale}/recipes/[slug]`, "page");
    revalidatePath(`/${locale}/programme`);
    revalidatePath(`/${locale}/programme/[slug]`, "page");
    revalidatePath(`/${locale}/katey`);
    revalidatePath(`/${locale}/mission`);
    revalidatePath(`/${locale}/kontakt`);
  }
  revalidatePath("/sitemap.xml");
}

export async function requestMagicLink(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  if (!isAllowedAdminEmail(email)) redirect("/admin/login?error=unauthorized");

  const origin = (await headers()).get("origin") ?? SITE_URL;
  const supabase = createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
      emailRedirectTo: `${origin}/admin/auth/confirm`,
    },
  });
  if (error) {
    console.error("Admin magic-link request failed", { code: error.code, status: error.status });
    redirect(`/admin/login?error=${error.status === 429 ? "rate" : "send"}`);
  }
  redirect("/admin/login?sent=1");
}

export async function loginWithPassword(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  const password = value(formData, "password");
  if (!isAllowedAdminEmail(email) || !password) redirect("/admin/login?error=credentials");
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/admin/login?error=credentials");
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_current_admin");
  if (adminError || isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  redirect("/admin");
}

export async function requestPasswordSetup(formData: FormData) {
  const email = value(formData, "email").toLowerCase();
  if (!isAllowedAdminEmail(email)) redirect("/admin/login?error=unauthorized");
  const origin = (await headers()).get("origin") ?? SITE_URL;
  const supabase = createSupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, { auth: { persistSession: false, autoRefreshToken: false } });
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/admin/password/setup` });
  if (error) {
    console.error("Admin password setup request failed", { code: error.code, status: error.status });
    redirect(`/admin/login?error=${error.status === 429 ? "rate" : "setup"}`);
  }
  redirect("/admin/forgot-password?sent=1");
}

export async function completePasswordReset(formData: FormData) {
  const tokenHash = value(formData, "token_hash");
  if (!tokenHash) redirect("/admin/login?error=expired");
  const password = rawValue(formData, "password");
  const confirmation = rawValue(formData, "password_confirmation");
  if (password !== confirmation || password.length < 12 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    redirect(`/admin/password/setup?token_hash=${encodeURIComponent(tokenHash)}&type=recovery&error=requirements`);
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type: "recovery", token_hash: tokenHash });
  if (error) redirect("/admin/login?error=expired");
  const { data: isAdmin, error: adminError } = await supabase.rpc("is_current_admin");
  if (adminError || isAdmin !== true) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  const { error: updateError } = await supabase.auth.updateUser({ password });
  if (updateError) {
    console.error("Admin password update failed", { code: updateError.code, status: updateError.status });
    redirect("/admin/set-password?error=update");
  }
  redirect("/admin?password=created");
}

export async function updateAdminPassword(formData: FormData) {
  await requireAdmin();
  const password = rawValue(formData, "password");
  const confirmation = rawValue(formData, "password_confirmation");
  if (password !== confirmation || password.length < 12 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    redirect("/admin/set-password?error=requirements");
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) redirect("/admin/set-password?error=update");
  redirect("/admin?password=created");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveRecipe(formData: FormData) {
  await requireAdmin();
  const originalKey = value(formData, "original_key");
  const slug = originalKey || slugify(value(formData, "slug") || value(formData, "title_en"));
  const category = value(formData, "category");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || !RECIPE_CATEGORIES.includes(category as (typeof RECIPE_CATEGORIES)[number])) {
    throw new Error("Recipe title, slug and category are required.");
  }

  const localized = (name: string) => ({
    en: value(formData, `${name}_en`),
    de: value(formData, `${name}_de`),
    sk: value(formData, `${name}_sk`),
  });
  const localizedLines = (name: string) => ({
    en: lines(formData, `${name}_en`),
    de: lines(formData, `${name}_de`),
    sk: lines(formData, `${name}_sk`),
  });

  const saveMode = value(formData, "status");
  const data = {
    slug,
    title: localized("title"),
    intro: localized("intro"),
    category,
    image: imageValue(formData) ?? "",
    imageAlt: localized("image_alt"),
    shortDescription: localized("short_description"),
    introduction: localized("introduction"),
    prepTime: localized("prep_time"),
    cookTime: localized("cook_time"),
    totalTime: localized("total_time"),
    servings: localized("servings"),
    tags: localizedLines("tags"),
    ingredientGroups: [{ items: localizedLines("ingredients") }],
    instructions: localizedLines("instructions"),
    featured: formData.get("featured") === "on",
  };
  if (Object.values(data.title).some((title) => !title)) throw new Error("A recipe title is required in every language.");
  if (!data.image) throw new Error("A recipe image is required.");
  assertContentSize(data);

  if (saveMode === "preview") {
    await saveAdminPreview({ content_type: "recipe", content_key: slug, status: "draft", sort_order: Number(value(formData, "sort_order")) || 0, image_path: imageValue(formData), data });
    redirect(`/en/recipes/${slug}?adminPreview=recipe`);
  }

  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "recipe",
      content_key: slug,
      status: saveMode === "published" ? "published" : "draft",
      sort_order: Number(value(formData, "sort_order")) || 0,
      image_path: imageValue(formData),
      data,
      deleted_at: null,
    },
    { onConflict: "content_type,content_key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  redirect("/admin/recipes?saved=1");
}

export async function saveProgram(formData: FormData) {
  await requireAdmin();
  const key = value(formData, "content_key") || slugify(value(formData, "title_en"));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) throw new Error("Program key is required.");
  const localized = (name: string) => ({
    en: value(formData, `${name}_en`),
    de: value(formData, `${name}_de`),
    sk: value(formData, `${name}_sk`),
  });
  const localizedLines = (name: string) => ({
    en: lines(formData, `${name}_en`),
    de: lines(formData, `${name}_de`),
    sk: lines(formData, `${name}_sk`),
  });
  const programCtaHref = value(formData, "cta_href") || "/kontakt";
  const secondaryCtaHref = value(formData, "secondary_cta_href");
  if (!programCtaHref.startsWith("/") && !programCtaHref.startsWith("https://") && !programCtaHref.startsWith("mailto:")) throw new Error("Please use a website path, secure web link or email link for the button destination.");
  if (secondaryCtaHref && !secondaryCtaHref.startsWith("/") && !secondaryCtaHref.startsWith("https://")) throw new Error("Please use a website path or secure web link for the secondary button destination.");
  const saveMode = value(formData, "status");
  const data = {
    kind: value(formData, "program_kind") === "conversation" ? "conversation" : "coaching",
    title: localized("title"),
    intro: localized("intro"),
    targetHeading: localized("target_heading"),
    targetAudience: localizedLines("target_audience"),
    transition: localized("transition"),
    includesHeading: localized("includes_heading"),
    includes: localizedLines("includes"),
    paragraphs: localizedLines("paragraphs"),
    duration: localized("duration"),
    ctaLabel: localized("cta_label"),
    secondaryCtaLabel: localized("secondary_cta_label"),
    ctaHref: programCtaHref,
    secondaryCtaHref: secondaryCtaHref || undefined,
    price: Number(value(formData, "price")) || 0,
    currency: value(formData, "currency").toUpperCase() || "CHF",
  };
  if (!data.title.en) throw new Error("An English program title is required.");
  const programImage = imageValue(formData);
  if (!programImage && !PROGRAMS.some((program) => program.slug === key)) throw new Error("A program image is required.");
  assertContentSize(data);
  if (saveMode === "preview") {
    await saveAdminPreview({ content_type: "program", content_key: key, status: "draft", sort_order: Number(value(formData, "sort_order")) || 0, image_path: programImage, data });
    redirect(`/en/programme/${key}?adminPreview=program`);
  }
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "program",
      content_key: key,
      status: saveMode === "published" ? "published" : "draft",
      sort_order: Number(value(formData, "sort_order")) || 0,
      image_path: programImage,
      data,
      deleted_at: null,
    },
    { onConflict: "content_type,content_key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  redirect("/admin/programs?saved=1");
}

export async function saveWebsiteContent(formData: FormData) {
  await requireAdmin();
  const key = value(formData, "content_key");
  if (!["homepage", "about", "mission", "contact"].includes(key)) throw new Error("Invalid website content section.");
  const localized = (name: string) => ({
    en: value(formData, `${name}_en`),
    de: value(formData, `${name}_de`),
    sk: value(formData, `${name}_sk`),
  });
  const ctaHref = value(formData, "cta_href");
  if (ctaHref && !ctaHref.startsWith("/") && !ctaHref.startsWith("https://") && !ctaHref.startsWith("mailto:")) throw new Error("Please use a website path, secure web link or email link for the button destination.");
  const saveMode = value(formData, "status");
  const data = { eyebrow: localized("eyebrow"), headline: localized("headline"), body: localized("body"), ctaLabel: localized("cta_label"), submitLabel: localized("submit_label"), ctaHref: ctaHref || undefined };
  assertContentSize(data);
  if (saveMode === "preview") {
    await saveAdminPreview({ content_type: "website", content_key: key, status: "draft", sort_order: 0, image_path: imageValue(formData), data });
    const path = key === "homepage" ? "/en" : key === "about" ? "/en/katey" : key === "mission" ? "/en/mission" : "/en/kontakt";
    redirect(`${path}?adminPreview=${key}`);
  }
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "website",
      content_key: key,
      status: saveMode === "published" ? "published" : "draft",
      image_path: imageValue(formData),
      data,
      deleted_at: null,
    },
    { onConflict: "content_type,content_key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  const adminPath = key === "homepage" ? "homepage" : key === "about" ? "about" : key;
  redirect(`/admin/${adminPath}?saved=1`);
}

export async function saveEditorialSection(formData: FormData) {
  await requireAdmin();
  const key = value(formData, "content_key") as EditorialSectionKey;
  const fields = EDITORIAL_SECTION_FIELDS[key];
  if (!fields) throw new Error("Invalid website content section.");
  const saveMode = value(formData, "status");
  const data = Object.fromEntries(fields.map((field) => [field.key, Object.fromEntries(routing.locales.map((locale) => [locale, value(formData, `${field.key}_${locale}`)]))]));
  assertContentSize(data);
  if (saveMode === "preview") {
    await saveAdminPreview({ content_type: "website", content_key: key, status: "draft", sort_order: 0, image_path: null, data });
    const path = key === "about-details" ? "/en/katey" : key === "recipes-page" ? "/en/recipes" : "/en";
    redirect(`${path}?adminPreview=${key}`);
  }
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert({
    content_type: "website",
    content_key: key,
    status: saveMode === "published" ? "published" : "draft",
    data,
    deleted_at: null,
  }, { onConflict: "content_type,content_key" });
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  const adminPath = key === "about-details" ? "about" : key === "recipes-page" ? "recipes/page-content" : "footer";
  redirect(`/admin/${adminPath}?saved=1`);
}

export async function saveFaqContent(formData: FormData) {
  await requireAdmin();
  const localized = (name: string) => ({
    en: value(formData, `${name}_en`),
    de: value(formData, `${name}_de`),
    sk: value(formData, `${name}_sk`),
  });
  const items = Object.fromEntries(routing.locales.map((locale) => [locale, Array.from({ length: 5 }, (_, index) => ({
    question: value(formData, `question_${index}_${locale}`),
    answer: value(formData, `answer_${index}_${locale}`),
  })).filter((item) => item.question && item.answer)]));
  const faqData = { headline: localized("headline"), body: localized("body"), items };
  assertContentSize(faqData);
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert({
    content_type: "website",
    content_key: "faq",
    status: value(formData, "status") === "published" ? "published" : "draft",
    data: faqData,
    deleted_at: null,
  }, { onConflict: "content_type,content_key" });
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  redirect("/admin/website?saved=1");
}

export async function deleteMedia(formData: FormData) {
  await requireAdmin();
  const path = value(formData, "path");
  if (!/^(recipes|programs|website)\/[a-zA-Z0-9._-]+\.(jpe?g|png|webp|avif)$/i.test(path)) {
    throw new Error("Invalid media path.");
  }
  const supabase = await createClient();
  const { error } = await supabase.storage.from("site-media").remove([path]);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/media");
  redirect("/admin/media?deleted=1");
}

export async function deleteEntry(formData: FormData) {
  await requireAdmin();
  const contentType = value(formData, "content_type");
  const contentKey = value(formData, "content_key");
  if (!(["program", "recipe"] as const).includes(contentType as "program" | "recipe") || !contentKey) {
    throw new Error("Invalid content deletion request.");
  }
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: contentType,
      content_key: contentKey,
      status: "draft",
      deleted_at: new Date().toISOString(),
      data: {},
    },
    { onConflict: "content_type,content_key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  redirect(`/admin/${contentType === "recipe" ? "recipes" : "programs"}?deleted=1`);
}
