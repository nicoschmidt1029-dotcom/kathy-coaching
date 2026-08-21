import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { RecipesIndex } from "@/components/site/recipes-index";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "pages.recipes" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/recipes"),
  };
}

export default async function RecipesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale } = await params;
  const { adminPreview } = await searchParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const isPreview = adminPreview === "recipes-page";
  const entry = isPreview ? await getAdminPreviewEntry("website", "recipes-page") : await getPublicWebsiteEntry("recipes-page");
  return <>{isPreview && <DraftPreviewBanner backHref="/admin/recipes/page-content" />}<RecipesIndex locale={locale as Locale} content={entry?.data as Record<string, Record<string, string>> | undefined} /></>;
}
