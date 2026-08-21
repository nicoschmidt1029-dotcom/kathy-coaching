import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { About } from "@/components/site/about";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

/**
 * Katey — her bio, the Three Threads approach, and how a program runs
 * week to week. Split out of the one-pager (Katarina's request: nav
 * clicks navigate to real pages, not anchors on the home scroll).
 *
 * About + Approach + HowIWork share this one route rather than each
 * getting its own: together they answer one question ("who is she and how
 * does she work"), which is what the "Katey" nav item promises — three
 * separate pages for that would fragment one story into three thin ones.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/katey"),
  };
}

export default async function KateyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ adminPreview?: string }>;
}) {
  const { locale } = await params;
  const { adminPreview } = await searchParams;
  setRequestLocale(locale);
  const previewMain = adminPreview === "about";
  const previewDetails = adminPreview === "about-details";
  const [entry, detailsEntry] = await Promise.all([
    previewMain ? getAdminPreviewEntry("website", "about") : getPublicWebsiteEntry("about"),
    previewDetails ? getAdminPreviewEntry("website", "about-details") : getPublicWebsiteEntry("about-details"),
  ]);
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string> } | undefined;
  const details = detailsEntry?.data as { calling?: Record<string, string> } | undefined;
  const content = entry || detailsEntry ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], calling: details?.calling?.[locale], image: entry?.image_path } : undefined;

  return <>{(previewMain || previewDetails) && <DraftPreviewBanner backHref="/admin/about" />}<About content={content} /></>;
}
