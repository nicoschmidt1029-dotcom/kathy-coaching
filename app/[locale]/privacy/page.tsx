import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { LegalShell } from "@/components/site/legal-shell";
import { PRIVACY_BODIES } from "@/components/legal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.privacy" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/privacy"),
    robots: { index: true, follow: true },
  };
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal" });
  // The document itself, in this locale — see components/legal/index.ts.
  const Body = PRIVACY_BODIES[locale as Locale] ?? PRIVACY_BODIES[routing.defaultLocale];

  return (
    <LegalShell
      eyebrow={t("privacyEyebrow")}
      title={t("privacyTitle")}
      updated="28 July 2026"
      draft
    >
      <Body />
    </LegalShell>
  );
}
