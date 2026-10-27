import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";
import { LegalShell } from "@/components/site/legal-shell";
import { TermsBody } from "@/components/legal/terms";
import { LEGAL_REVIEWED } from "@/components/legal";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.terms" });
  return { ...pageMetadata(locale, "/terms", t("title"), t("description")), robots: { index: false, follow: true } };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const updated = locale === "de" ? "6. Oktober 2026" : locale === "sk" ? "6. októbra 2026" : "6 October 2026";
  return <LegalShell eyebrow={t("termsEyebrow")} title={t("termsTitle")} updated={updated} draft={!LEGAL_REVIEWED}><TermsBody locale={locale as Locale} /></LegalShell>;
}
