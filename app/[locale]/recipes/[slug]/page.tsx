import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RecipeDetail } from "@/components/site/recipe-detail";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { PUBLIC_RECIPE_SLUGS } from "@/lib/recipes";
import { getAdminPreviewRecipe, getPublicRecipe } from "@/lib/cms";

export function generateStaticParams() {
  return PUBLIC_RECIPE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const recipe = await getPublicRecipe(slug, locale as Locale);
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
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale, slug } = await params;
  const { adminPreview } = await searchParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const isPreview = adminPreview === "recipe";
  const recipe = isPreview ? await getAdminPreviewRecipe(slug, locale as Locale) : await getPublicRecipe(slug, locale as Locale);
  if (!recipe) notFound();

  return <>{isPreview && <DraftPreviewBanner backHref={`/admin/recipes/${slug}`} />}<RecipeDetail recipe={recipe} locale={locale as Locale} /></>;
}
