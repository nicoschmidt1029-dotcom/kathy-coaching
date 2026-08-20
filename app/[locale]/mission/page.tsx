import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Mission } from "@/components/site/mission";
import { getPublicWebsiteEntry } from "@/lib/cms";

/**
 * Mission — its own page now, per Katarina's request (nav clicks navigate
 * to real pages, not anchors on the home scroll). Was a band on the
 * one-pager between HowIWork and Contact.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.mission" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/mission"),
  };
}

export default async function MissionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entry = await getPublicWebsiteEntry("mission");
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string> } | undefined;
  const content = entry ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], image: entry.image_path } : undefined;

  return <Mission content={content} />;
}
