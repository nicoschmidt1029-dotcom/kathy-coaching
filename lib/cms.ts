import "server-only";

import type { Locale } from "@/i18n/routing";
import {
  RECIPES,
  getRecipes as getStaticRecipes,
  type LocalizedRecipe,
  type Recipe,
} from "@/lib/recipes";
import { createClient } from "@/lib/supabase/server";

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
  const fallback = getStaticRecipes(locale);
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

    const staticKeys = new Set(RECIPES.map((recipe) => recipe.slug));
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

export function staticRecipeForAdmin(slug: string) {
  return RECIPES.find((recipe) => recipe.slug === slug);
}
