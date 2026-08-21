import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
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
            <p className="mt-2 max-w-xl text-[0.92rem] leading-relaxed text-foreground/58 sm:text-[0.98rem]">
              {editable("introSecondary", t("introSecondary"))}
            </p>
          </div>

          {featured && (
            <div className="mt-8 grid grid-cols-1 items-center gap-7 border-y border-foreground/10 py-8 md:mt-10 md:grid-cols-12 md:gap-12 md:py-10 lg:gap-16">
              <Link
                href={`/recipes/${featured.slug}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 md:col-span-7"
              >
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.025] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </Link>

              <div className="md:col-span-5">
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

      <section className="pb-14 md:pb-20">
        <div className="container-page">
          <p className="eyebrow">{editable("exploreEyebrow", t("exploreEyebrow"))}</p>
          <h2 className="section-title mt-3">{editable("exploreTitle", t("exploreTitle"))}</h2>
          <RecipesGrid
            recipes={recipes}
            labels={categoryLabels}
            viewRecipe={t("viewRecipe")}
            searchLabel={t("searchLabel")}
            searchPlaceholder={t("searchPlaceholder")}
            clearSearch={t("clearSearch")}
            empty={t("noResults")}
          />
        </div>
      </section>

      <section className="bg-[var(--sand)]">
        <div className="container-page py-12 md:py-16">
          <blockquote className="mx-auto max-w-3xl text-center font-display text-[1.45rem] leading-snug italic text-foreground/78 sm:text-[1.8rem]">
            “{editable("quote", t("quote"))}”
          </blockquote>
        </div>
      </section>

      <section className="bg-[var(--petrol-deep)] text-[var(--primary-foreground)]">
        <div className="container-page py-14 md:py-20">
          <div className="grid items-end gap-8 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-8">
              <p className="eyebrow text-[var(--primary-foreground)]/65">
                {editable("wellnessEyebrow", t("wellness.eyebrow"))}
              </p>
              <h2 className="section-title mt-4 text-[var(--primary-foreground)]">
                {editable("wellnessTitle", t("wellness.title"))}
              </h2>
              <p className="mt-5 max-w-2xl leading-relaxed text-[var(--primary-foreground)]/72 sm:text-lg">
                {editable("wellnessBody", t("wellness.body"))}
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <Button
                asChild
                size="lg"
                className="h-11 bg-[var(--primary-foreground)] px-5 text-[var(--plum)] hover:bg-[var(--primary-foreground)]/90"
              >
                <Link href="/programme">
                  {editable("wellnessCta", t("wellness.cta"))}
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
