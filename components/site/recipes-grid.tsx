"use client";

import { Search, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
  RECIPE_CATEGORIES,
  type LocalizedRecipe,
  type RecipeCategory,
} from "@/lib/recipes";
import { cn } from "@/lib/utils";
import { RecipeCard } from "./recipe-card";

type Category = "all" | RecipeCategory;

type Props = {
  recipes: LocalizedRecipe[];
  labels: Record<Category, string>;
  viewRecipe: string;
  searchLabel: string;
  searchPlaceholder: string;
  clearSearch: string;
  empty: string;
};

export function RecipesGrid({
  recipes,
  labels,
  viewRecipe,
  searchLabel,
  searchPlaceholder,
  clearSearch,
  empty,
}: Props) {
  const t = useTranslations("recipes");
  const [selected, setSelected] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const categories: Category[] = ["all", ...RECIPE_CATEGORIES];

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    return recipes.filter((recipe) => {
      const categoryMatches =
        selected === "all" || recipe.category === selected;
      if (!categoryMatches) return false;
      if (!normalizedQuery) return true;

      const searchable = [
        recipe.title,
        recipe.shortDescription,
        labels[recipe.category],
        ...recipe.tags,
        ...recipe.ingredientGroups.flatMap((group) => group.items),
      ]
        .join(" ")
        .toLocaleLowerCase();

      return searchable.includes(normalizedQuery);
    });
  }, [labels, query, recipes, selected]);

  return (
    <div className="mt-7">
      <div className="flex flex-col gap-5 border-b border-foreground/10 pb-1 lg:flex-row lg:items-end lg:justify-between">
        <div className="relative w-full max-w-md">
          <label htmlFor="recipe-search" className="sr-only">
            {searchLabel}
          </label>
          <Search
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 text-foreground/45"
          />
          <input
            id="recipe-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="h-11 w-full border-b border-foreground/20 bg-transparent pl-7 pr-9 text-[0.95rem] outline-none transition-colors placeholder:text-foreground/42 focus:border-[var(--plum)]"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label={clearSearch}
              className="absolute right-0 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-x-6">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelected(category)}
                aria-pressed={selected === category}
                className={cn(
                  "relative pb-3 text-[0.88rem] text-foreground/60 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  selected === category && "text-[var(--plum)]"
                )}
              >
                {labels[category]}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-0 bottom-[-1px] h-px origin-left bg-[var(--plum)] transition-transform duration-300",
                    selected === category ? "scale-x-100" : "scale-x-0"
                  )}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="caption mt-5">
        {t("count", { count: filtered.length })}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-7 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-14">
          {filtered.map((recipe) => (
            <li key={recipe.slug}>
              <RecipeCard
                recipe={recipe}
                categoryLabel={labels[recipe.category]}
                viewRecipe={viewRecipe}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-10 rounded-2xl bg-[var(--sand)] px-6 py-10 sm:px-10">
          <p className="max-w-xl font-display text-2xl leading-snug text-foreground/78">
            {empty}
          </p>
        </div>
      )}
    </div>
  );
}
