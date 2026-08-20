import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Programs } from "@/components/site/programs";
import type { Locale } from "@/i18n/routing";

/**
 * Programs — was the first section split out of the one-pager ("one page
 * yes but program should be an extra one"); the rest of the site followed
 * the same pattern later (Katey, Mission, Contact all real routes now too).
 *
 * The builder is included here (bundlesOnly is left at its default,
 * false) — a calculator is a destination on a page someone navigated to
 * specifically to compare options, not a wall mid-scroll.
 *
 * Bundle "choose this" links point at `/kontakt?bundle=…` (see
 * programs.tsx) — Contact is its own page, so a selection made here
 * carries over to the form there.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.programs" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/programme"),
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <Programs locale={locale as Locale} />;
}
