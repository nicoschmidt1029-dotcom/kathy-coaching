"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
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
  empty: string;
};

export function RecipesGrid({
  recipes,
  labels,
  viewRecipe,
  empty,
}: Props) {
  const t = useTranslations("recipes");
  const [selected, setSelected] = useState<Category>("all");
  const available = new Set(recipes.map((recipe) => recipe.category));
  const categories: Category[] = ["all", ...RECIPE_CATEGORIES.filter((category) => available.has(category))];

  const filtered = recipes.filter((recipe) => selected === "all" || recipe.category === selected);

  return (
    <div className="mt-7">
      <div className="border-b border-foreground/10 pb-1">
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
