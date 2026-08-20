import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { type LocalizedRecipe } from "@/lib/recipes";
import { getPublicRecipes } from "@/lib/cms";
import { RecipeCard } from "./recipe-card";

export async function RecipeDetail({
  recipe,
  locale,
}: {
  recipe: LocalizedRecipe;
  locale: Locale;
}) {
  const t = await getTranslations({ locale, namespace: "recipes" });
  const candidates = (await getPublicRecipes(locale)).filter(
    (item) => item.slug !== recipe.slug
  );
  const related = [
    ...candidates.filter((item) => item.category === recipe.category),
    ...candidates.filter((item) => item.category !== recipe.category),
  ].slice(0, 3);

  const metadata = [
    { label: t("detail.prepTime"), value: recipe.prepTime },
    ...(recipe.cookTime
      ? [{ label: t("detail.cookTime"), value: recipe.cookTime }]
      : []),
    { label: t("detail.totalTime"), value: recipe.totalTime },
    { label: t("detail.servings"), value: recipe.servings },
  ];

  return (
    <article className="pb-16 md:pb-24">
      <div className="container-page section-pad-top-tight">
        <Link
          href="/recipes"
          className="group inline-flex items-center gap-2 text-[0.88rem] text-foreground/62 transition-colors hover:text-[var(--plum)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          {t("backToRecipes")}
        </Link>

        <header className="mt-7 max-w-4xl">
          <p className="eyebrow">{t(`categories.${recipe.category}`)}</p>
          <h1 className="mt-3 font-display text-[clamp(2.45rem,6vw,4.75rem)] leading-[1.02] text-[var(--plum)]">
            {recipe.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-foreground/72 sm:text-lg">
            {recipe.introduction}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {recipe.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[var(--sand)] px-3 py-1 font-mono text-[0.67rem] tracking-[0.08em] uppercase text-foreground/65"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-foreground/10 sm:grid-cols-4">
          {metadata.map((item) => (
            <div key={item.label} className="bg-background p-4 sm:p-5">
              <dt className="caption">{item.label}</dt>
              <dd className="mt-2 font-display text-lg sm:text-xl">{item.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--sand)] md:mt-10 md:aspect-[16/9]">
          <Image
            src={recipe.image}
            alt={recipe.imageAlt}
            fill
            priority
            sizes="(max-width: 1216px) 100vw, 1216px"
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
          <section className="md:col-span-5">
            <p className="eyebrow">{t("detail.ingredientsEyebrow")}</p>
            <h2 className="section-title mt-3">{t("detail.ingredients")}</h2>
            <div className="mt-6 space-y-7">
              {recipe.ingredientGroups.map((group, groupIndex) => (
                <div key={group.title ?? groupIndex}>
                  {group.title && (
                    <h3 className="font-display text-xl text-[var(--plum)]">
                      {group.title}
                    </h3>
                  )}
                  <ul className="mt-3 divide-y divide-foreground/10 border-y border-foreground/10">
                    {group.items.map((ingredient) => (
                      <li
                        key={ingredient}
                        className="py-3.5 leading-relaxed text-foreground/75"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="md:col-span-7">
            <p className="eyebrow">{t("detail.instructionsEyebrow")}</p>
            <h2 className="section-title mt-3">{t("detail.instructions")}</h2>
            <ol className="mt-7 space-y-7">
              {recipe.instructions.map((instruction, index) => (
                <li key={instruction} className="grid grid-cols-[2rem_1fr] gap-4">
                  <span className="font-mono text-xs tracking-widest text-[var(--clay)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="leading-relaxed text-foreground/75">{instruction}</p>
                </li>
              ))}
            </ol>

            <aside className="mt-12 rounded-2xl bg-[var(--sand)] p-6 sm:p-8">
              <p className="eyebrow">{t("detail.noteEyebrow")}</p>
              <h2 className="mt-3 font-display text-2xl text-[var(--plum)]">
                {t("detail.noteTitle")}
              </h2>
              <p className="mt-4 leading-relaxed text-foreground/72">
                {t("detail.noteBody")}
              </p>
            </aside>
          </section>
        </div>
      </div>

      {related.length > 0 && <section className="mt-16 border-t border-foreground/10 pt-14 md:mt-24 md:pt-20">
        <div className="container-page">
          <p className="eyebrow">{t("detail.relatedEyebrow")}</p>
          <h2 className="section-title mt-3">{t("detail.relatedTitle")}</h2>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <RecipeCard
                  recipe={item}
                  categoryLabel={t(`categories.${item.category}`)}
                  viewRecipe={t("viewRecipe")}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>}
    </article>
  );
}
