import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { RECIPE_CATEGORIES } from "@/lib/recipes";
import { getPublicRecipes } from "@/lib/cms";
import { DisplayTitle } from "./display-title";
import { RecipesGrid } from "./recipes-grid";

type RecipesPageContent = Record<string, Partial<Record<Locale, string>>>;

export async function RecipesIndex({ locale, content }: { locale: Locale; content?: RecipesPageContent }) {
  const t = await getTranslations({ locale, namespace: "recipes" });
  const editable = (key: string, fallback: string) => content?.[key]?.[locale] || fallback;
  const recipes = await getPublicRecipes(locale);
  const featured = recipes.find((recipe) => recipe.featured) ?? recipes[0];
  const remaining = featured ? recipes.filter((recipe) => recipe.slug !== featured.slug) : recipes;
  const categoryLabels = {
    all: t("categories.all"),
    ...Object.fromEntries(
      RECIPE_CATEGORIES.map((category) => [category, t(`categories.${category}`)])
    ),
  } as Record<"all" | (typeof RECIPE_CATEGORIES)[number], string>;

  return (
    <>
      <section className="section-pad-top-tight pb-12 md:pb-16">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">{editable("eyebrow", t("eyebrow"))}</p>
            <DisplayTitle className="mt-3">{editable("title", t("title"))}</DisplayTitle>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-foreground/72 sm:text-lg">
              {editable("intro", t("intro"))}
            </p>
          </div>

          {featured && (
            <div className="mt-8 grid grid-cols-1 items-center gap-7 border-y border-foreground/10 py-8 md:mt-10 md:grid-cols-12 md:gap-12 md:py-10 lg:gap-14">
              <Link
                href={`/recipes/${featured.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:col-span-5"
              >
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </Link>

              <div className="md:col-span-7">
                <p className="eyebrow">{editable("featured", t("featured"))}</p>
                <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.06] text-[var(--plum)]">
                  {featured.title}
                </h2>
                <p className="mt-4 leading-relaxed text-foreground/70 sm:text-[1.02rem]">
                  {featured.introduction}
                </p>
                <p className="caption mt-5 flex flex-wrap gap-x-2 gap-y-1 text-foreground/58">
                  <span>{featured.tags[0]}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.totalTime}</span>
                  <span aria-hidden>·</span>
                  <span>{t("serves", { servings: featured.servings })}</span>
                </p>
                <Link
                  href={`/recipes/${featured.slug}`}
                  className="group mt-6 inline-flex items-center gap-2 text-[0.92rem] font-medium text-[var(--plum)] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
                >
                  {t("viewRecipe")}
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {remaining.length > 0 && <section className="pb-14 md:pb-20">
        <div className="container-page">
          <p className="eyebrow">{editable("exploreEyebrow", t("exploreEyebrow"))}</p>
          <h2 className="section-title mt-3">{editable("exploreTitle", t("exploreTitle"))}</h2>
          <RecipesGrid
            recipes={remaining}
            labels={categoryLabels}
            viewRecipe={t("viewRecipe")}
            empty={t("noResults")}
          />
        </div>
      </section>}
    </>
  );
}
