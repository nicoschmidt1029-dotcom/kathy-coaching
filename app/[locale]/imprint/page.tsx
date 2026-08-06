import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { LegalShell } from "@/components/site/legal-shell";
import { IMPRINT_BODIES, LEGAL_REVIEWED } from "@/components/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.imprint" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/imprint"),
    // noindex until the legal review is done — see LEGAL_REVIEWED.
    // follow stays on: the links out of this page are fine to crawl.
    robots: { index: LEGAL_REVIEWED, follow: true },
  };
}

export default async function ImprintPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });
  // The document itself, in this locale — see components/legal/index.ts.
  const Body = IMPRINT_BODIES[locale as Locale] ?? IMPRINT_BODIES[routing.defaultLocale];

  return (
    <LegalShell
      eyebrow={t("imprintEyebrow")}
      title={t("imprintTitle")}
      updated="28 July 2026"
      draft
    >
      <Body />
    </LegalShell>
  );
}
