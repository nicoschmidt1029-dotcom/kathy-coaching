import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { LegalShell } from "@/components/site/legal-shell";
import { TermsBody } from "@/components/legal/terms";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });
  return { title: t("title"), description: t("description"), alternates: alternatesFor(locale, "/terms"), robots: { index: false, follow: true } };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const updated = locale === "de" ? "9. September 2026" : locale === "sk" ? "9. septembra 2026" : "9 September 2026";
  return <LegalShell eyebrow={t("termsEyebrow")} title={t("termsTitle")} updated={updated}><TermsBody locale={locale as Locale} /></LegalShell>;
}
