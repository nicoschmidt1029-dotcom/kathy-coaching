import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Contact } from "@/components/site/contact";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicWebsiteEntry } from "@/lib/cms";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return { title: t("title"), alternates: alternatesFor(locale, "/kontakt") };
}

export default async function KontaktPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ adminPreview?: string; payment?: string }> }) {
  const { locale } = await params;
  const { adminPreview, payment } = await searchParams;
  setRequestLocale(locale);
  const isPreview = adminPreview === "contact";
  const entry = isPreview ? await getAdminPreviewEntry("website", "contact") : await getPublicWebsiteEntry("contact");
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string>; submitLabel?: Record<string, string> } | undefined;
  const content = entry ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], submitLabel: data?.submitLabel?.[locale], image: entry.image_path } : undefined;
  const paymentOptions: Record<string, string> = {
    "a-1": "The Full Transformation — Pay in Full, 1,290.",
    "a-2": "The Full Transformation — 2 Payments, 700 per month, 1,400 total.",
    "a-3": "The Full Transformation — 3 Payments, 480 per month, 1,440 total.",
    "b-month": "Move and Grow — 200 CHF per month",
    "c-hour": "Find Your Way Through — 80 CHF per hour",
  };
  return <>{isPreview && <DraftPreviewBanner backHref="/admin/contact" />}<Contact content={content} selectedPlan={payment ? paymentOptions[payment] : undefined} /></>;
}
