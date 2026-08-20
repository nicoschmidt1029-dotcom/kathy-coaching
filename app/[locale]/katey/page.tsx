import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { About } from "@/components/site/about";
import { getPublicWebsiteEntry } from "@/lib/cms";

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
    alternates: alternatesFor(locale, "/katey"),
  };
}

export default async function KateyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const entry = await getPublicWebsiteEntry("about");
  const data = entry?.data as { headline?: Record<string, string>; body?: Record<string, string> } | undefined;
  const content = entry ? { headline: data?.headline?.[locale], body: data?.body?.[locale], image: entry.image_path } : undefined;

  return <About content={content} />;
}
