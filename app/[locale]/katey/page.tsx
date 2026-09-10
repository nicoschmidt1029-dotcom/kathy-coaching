import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { About } from "@/components/site/about";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

const APPROVED_BIOGRAPHY_AT = Date.parse("2026-09-09T19:25:22Z");

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
  // The published CMS row predates the biography approved on 2026-09-09
  // (and currently contains a blank English body). Use the shipped baseline
  // until Katey publishes a newer admin edit; headings and portrait remain
  // independently CMS-managed throughout.
  const biographyManaged = Boolean(entry && Date.parse(entry.updated_at) >= APPROVED_BIOGRAPHY_AT);
  const localizedCalling = details?.calling?.[locale];
  const content = entry || detailsEntry ? { mainManaged: Boolean(entry), biographyManaged, callingManaged: Boolean(localizedCalling?.trim()), eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], calling: localizedCalling, image: entry?.image_path } : undefined;

  return <>{(previewMain || previewDetails) && <DraftPreviewBanner backHref="/admin/about" />}<About content={content} /></>;
}
