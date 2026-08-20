import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/site/recipe-detail";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { getRecipe, RECIPES } from "@/lib/recipes";

export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const recipe = getRecipe(slug, locale as Locale);
  if (!recipe) return {};
  const t = await getTranslations({ locale, namespace: "recipes" });

  return {
    title: recipe.title,
    description: recipe.shortDescription,
    alternates: alternatesFor(locale, `/recipes/${slug}`),
    openGraph: {
      title: recipe.title,
      description: recipe.shortDescription,
      images: [{ url: recipe.image, alt: recipe.imageAlt }],
      type: "article",
    },
    other: { "recipe:category": t(`categories.${recipe.category}`) },
  };
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const recipe = getRecipe(slug, locale as Locale);
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} locale={locale as Locale} />;
}
