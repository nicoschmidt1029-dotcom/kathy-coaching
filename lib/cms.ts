import "server-only";

import type { Locale } from "@/i18n/routing";
import {
  RECIPES,
  PUBLIC_RECIPE_SLUGS,
  getRecipes as getStaticRecipes,
  type LocalizedRecipe,
  type Recipe,
} from "@/lib/recipes";
import {
  PROGRAMS,
  getPrograms as getStaticPrograms,
  type LocalizedProgram,
} from "@/lib/programs";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/admin-auth";
import { readAdminPreview } from "@/lib/admin-preview";

export type CmsStatus = "draft" | "published";
export type CmsContentType = "program" | "recipe" | "website";

export type CmsEntry = {
  id: string;
  content_type: CmsContentType;
  content_key: string;
  status: CmsStatus;
  sort_order: number;
  image_path: string | null;
  data: Record<string, unknown>;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
};

type EntryState = { content_key: string; status: CmsStatus; deleted: boolean };

function localizeCmsRecipe(entry: CmsEntry, locale: Locale): LocalizedRecipe | null {
  try {
    const recipe = entry.data as unknown as Recipe;
    const localized = {
      ...recipe,
      slug: entry.content_key,
      image: entry.image_path ?? recipe.image,
      title: recipe.title[locale],
      imageAlt: recipe.imageAlt[locale],
      shortDescription: recipe.shortDescription[locale],
      introduction: recipe.introduction[locale],
      prepTime: recipe.prepTime[locale],
      cookTime: recipe.cookTime?.[locale],
      totalTime: recipe.totalTime[locale],
      servings: recipe.servings[locale],
      tags: recipe.tags[locale],
      ingredientGroups: recipe.ingredientGroups.map((group) => ({
        title: group.title?.[locale],
        items: group.items[locale],
      })),
      instructions: recipe.instructions[locale],
    } satisfies LocalizedRecipe;
    return localized;
  } catch {
    return null;
  }
}

export async function getCmsEntries(contentType: CmsContentType) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("cms_entries")
    .select("*")
    .eq("content_type", contentType)
    .order("sort_order")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`Unable to load ${contentType} content`);
  return (data ?? []) as CmsEntry[];
}

export async function getPublicRecipes(locale: Locale): Promise<LocalizedRecipe[]> {
  const approvedSlugs = new Set<string>(PUBLIC_RECIPE_SLUGS);
  const fallback = getStaticRecipes(locale).filter((recipe) => approvedSlugs.has(recipe.slug));
  try {
    const supabase = await createClient();
    const [{ data: entries, error }, { data: states, error: stateError }] =
      await Promise.all([
        supabase
          .from("cms_entries")
          .select("*")
          .eq("content_type", "recipe")
          .eq("status", "published")
          .is("deleted_at", null)
          .order("sort_order"),
        supabase.rpc("cms_entry_states", { requested_type: "recipe" }),
      ]);
    if (error || stateError) return fallback;

    const stateMap = new Map(
      ((states ?? []) as EntryState[]).map((state) => [state.content_key, state])
    );
    const entryMap = new Map(
      ((entries ?? []) as CmsEntry[]).map((entry) => [entry.content_key, entry])
    );

    const merged = fallback.flatMap((recipe) => {
      const state = stateMap.get(recipe.slug);
      if (state?.deleted || state?.status === "draft") return [];
      const override = entryMap.get(recipe.slug);
      return override ? [localizeCmsRecipe(override, locale) ?? recipe] : [recipe];
    });

    const staticKeys = new Set(fallback.map((recipe) => recipe.slug));
    for (const entry of (entries ?? []) as CmsEntry[]) {
      if (!staticKeys.has(entry.content_key)) {
        const recipe = localizeCmsRecipe(entry, locale);
        if (recipe) merged.push(recipe);
      }
    }
    return merged;
  } catch {
    return fallback;
  }
}

function localizeCmsProgram(entry: CmsEntry, locale: Locale): LocalizedProgram | null {
  try {
    const data = entry.data as unknown as {
      title?: Partial<Record<Locale, string>>;
      intro?: Partial<Record<Locale, string>>;
      targetHeading?: Partial<Record<Locale, string>>;
      targetAudience?: Partial<Record<Locale, readonly string[]>>;
      transition?: Partial<Record<Locale, string>>;
      includesHeading?: Partial<Record<Locale, string>>;
      includes?: Partial<Record<Locale, readonly string[]>>;
      howHeading?: Partial<Record<Locale, string>>;
      howSteps?: Partial<Record<Locale, readonly string[]>>;
      howClosing?: Partial<Record<Locale, string>>;
      duration?: Partial<Record<Locale, string>>;
      ctaLabel?: Partial<Record<Locale, string>>;
      paymentOptions?: Partial<Record<Locale, readonly string[]>>;
      ctaHref?: string;
      imageAlt?: string;
      price?: number;
      currency?: string;
      kind?: "coaching" | "conversation";
      paragraphs?: Partial<Record<Locale, readonly string[]>>;
      secondaryCtaLabel?: Partial<Record<Locale, string>>;
      secondaryCtaHref?: string;
    };
    const present = <T>(value: T | undefined) =>
      Array.isArray(value) ? value.length > 0 : typeof value === "string" ? value.length > 0 : value !== undefined;
    const pick = <T>(field: Partial<Record<Locale, T>> | undefined, fallback: T) => {
      const localized = field?.[locale];
      if (present(localized)) return localized as T;
      const english = field?.en;
      return present(english) ? english as T : fallback;
    };
    const fallback = PROGRAMS.find((program) => program.slug === entry.content_key);
    const base = fallback
      ? getStaticPrograms(locale).find((program) => program.slug === entry.content_key)!
      : undefined;
    const title = pick(data.title, base?.title ?? "");
    if (!title) return null;
    return {
      slug: entry.content_key,
      label: base?.label ?? "Program",
      image: entry.image_path ?? base?.image ?? "",
      imageAlt: data.imageAlt ?? base?.imageAlt ?? title,
      price: data.price ?? base?.price ?? 0,
      currency: data.currency ?? base?.currency ?? "CHF",
      kind: data.kind ?? base?.kind ?? "coaching",
      title,
      intro: pick(data.intro, base?.intro ?? ""),
      targetHeading: pick(data.targetHeading, base?.targetHeading ?? "This program is for:"),
      targetAudience: pick(data.targetAudience, base?.targetAudience ?? []),
      transition: pick(data.transition, base?.transition ?? ""),
      includesHeading: pick(data.includesHeading, base?.includesHeading ?? "This program includes:"),
      includes: pick(data.includes, base?.includes ?? []),
      howHeading: pick(data.howHeading, base?.howHeading ?? ""),
      howSteps: pick(data.howSteps, base?.howSteps ?? []),
      howClosing: pick(data.howClosing, base?.howClosing ?? ""),
      duration: pick(data.duration, base?.duration ?? ""),
      ctaLabel: pick(data.ctaLabel, base?.ctaLabel ?? ""),
      paymentOptions: pick(data.paymentOptions, base?.paymentOptions ?? []),
      ctaHref: data.ctaHref ?? base?.ctaHref ?? "/kontakt",
      paragraphs: pick(data.paragraphs, base?.paragraphs ?? []),
      secondaryCtaLabel: pick(data.secondaryCtaLabel, base?.secondaryCtaLabel ?? ""),
      secondaryCtaHref: data.secondaryCtaHref ?? base?.secondaryCtaHref,
    };
  } catch {
    return null;
  }
}

export async function getPublicPrograms(locale: Locale): Promise<LocalizedProgram[]> {
  const fallback = getStaticPrograms(locale);
  try {
    const supabase = await createClient();
    const [{ data: entries, error }, { data: states, error: stateError }] = await Promise.all([
      supabase.from("cms_entries").select("*").eq("content_type", "program").eq("status", "published").is("deleted_at", null).order("sort_order"),
      supabase.rpc("cms_entry_states", { requested_type: "program" }),
    ]);
    if (error || stateError) return fallback;
    const stateMap = new Map(((states ?? []) as EntryState[]).map((state) => [state.content_key, state]));
    const entryMap = new Map(((entries ?? []) as CmsEntry[]).map((entry) => [entry.content_key, entry]));
    const merged = fallback.flatMap((program) => {
      const state = stateMap.get(program.slug);
      if (state?.deleted || state?.status === "draft") return [];
      const override = entryMap.get(program.slug);
      return override ? [localizeCmsProgram(override, locale) ?? program] : [program];
    });
    const staticKeys = new Set(PROGRAMS.map((program) => program.slug));
    for (const entry of (entries ?? []) as CmsEntry[]) {
      if (!staticKeys.has(entry.content_key)) {
        const program = localizeCmsProgram(entry, locale);
        if (program) merged.push(program);
      }
    }
    return merged;
  } catch {
    return fallback;
  }
}

export async function getPublicProgram(slug: string, locale: Locale) {
  return (await getPublicPrograms(locale)).find((program) => program.slug === slug);
}

export async function getPublicRecipe(slug: string, locale: Locale) {
  const recipes = await getPublicRecipes(locale);
  return recipes.find((recipe) => recipe.slug === slug);
}

export async function getPublicProgramContent() {
  try {
    const supabase = await createClient();
    const [{ data, error }, { data: states, error: stateError }] = await Promise.all([
      supabase.from("cms_entries").select("*").eq("content_type", "program").eq("status", "published").is("deleted_at", null).order("sort_order"),
      supabase.rpc("cms_entry_states", { requested_type: "program" }),
    ]);
    if (error || stateError) return { entries: [] as CmsEntry[], states: [] as EntryState[] };
    return { entries: (data ?? []) as CmsEntry[], states: (states ?? []) as EntryState[] };
  } catch {
    return { entries: [] as CmsEntry[], states: [] as EntryState[] };
  }
}

export async function getPublicWebsiteEntry(contentKey: string) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("cms_entries")
      .select("*")
      .eq("content_type", "website")
      .eq("content_key", contentKey)
      .eq("status", "published")
      .is("deleted_at", null)
      .maybeSingle();
    return error ? null : (data as CmsEntry | null);
  } catch {
    return null;
  }
}

export async function getAdminPreviewEntry(contentType: CmsContentType, contentKey: string) {
  await requireAdmin();
  const preview = await readAdminPreview(contentType, contentKey);
  if (preview) return { ...preview, id: "preview", deleted_at: null, created_at: new Date().toISOString(), updated_at: new Date().toISOString() } as CmsEntry;
  const supabase = await createClient();
  const { data, error } = await supabase.from("cms_entries").select("*").eq("content_type", contentType).eq("content_key", contentKey).is("deleted_at", null).maybeSingle();
  if (error) throw new Error("Unable to load preview content.");
  return data as CmsEntry | null;
}

export async function getAdminPreviewProgram(contentKey: string, locale: Locale) {
  const entry = await getAdminPreviewEntry("program", contentKey);
  return entry ? localizeCmsProgram(entry, locale) : null;
}

export async function getAdminPreviewRecipe(contentKey: string, locale: Locale) {
  const entry = await getAdminPreviewEntry("recipe", contentKey);
  return entry ? localizeCmsRecipe(entry, locale) : null;
}

export function staticRecipeForAdmin(slug: string) {
  return RECIPES.find((recipe) => recipe.slug === slug);
}
