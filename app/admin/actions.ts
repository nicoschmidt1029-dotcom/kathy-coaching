"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { RECIPE_CATEGORIES } from "@/lib/recipes";
import { requireAdmin, isAllowedAdminEmail } from "@/lib/admin-auth";
import { createClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/site-url";
import { routing } from "@/i18n/routing";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const value = (form: FormData, name: string) =>
  String(form.get(name) ?? "").trim();
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

function revalidatePublicContent() {
  for (const locale of routing.locales) {
    revalidatePath(`/${locale}/recipes`);
    revalidatePath(`/${locale}/programme`);
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
  if (error) redirect("/admin/login?error=send");
  redirect("/admin/login?sent=1");
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
  if (!slug || !RECIPE_CATEGORIES.includes(category as (typeof RECIPE_CATEGORIES)[number])) {
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

  const data = {
    slug,
    title: localized("title"),
    category,
    image: value(formData, "image_path"),
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

  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "recipe",
      content_key: slug,
      status: value(formData, "status") === "published" ? "published" : "draft",
      sort_order: Number(value(formData, "sort_order")) || 0,
      image_path: value(formData, "image_path") || null,
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
  if (!key) throw new Error("Program key is required.");
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
  const data = {
    title: localized("title"),
    subtitle: localized("subtitle"),
    description: localized("description"),
    duration: localized("duration"),
    features: localizedLines("features"),
    ctaLabel: localized("cta_label"),
    ctaHref: value(formData, "cta_href") || "/kontakt",
    price: Number(value(formData, "price")) || 0,
  };
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "program",
      content_key: key,
      status: value(formData, "status") === "published" ? "published" : "draft",
      sort_order: Number(value(formData, "sort_order")) || 0,
      image_path: value(formData, "image_path") || null,
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
  const localized = (name: string) => ({
    en: value(formData, `${name}_en`),
    de: value(formData, `${name}_de`),
    sk: value(formData, `${name}_sk`),
  });
  const data = { headline: localized("headline"), body: localized("body") };
  const supabase = await createClient();
  const { error } = await supabase.from("cms_entries").upsert(
    {
      content_type: "website",
      content_key: key,
      status: value(formData, "status") === "published" ? "published" : "draft",
      image_path: value(formData, "image_path") || null,
      data,
      deleted_at: null,
    },
    { onConflict: "content_type,content_key" }
  );
  if (error) throw new Error(error.message);
  revalidatePublicContent();
  redirect("/admin/website?saved=1");
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
