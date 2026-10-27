import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/i18n/metadata";
import { Contact } from "@/components/site/contact";
import type { CheckoutPlan } from "@/components/site/contact";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { getAdminPreviewEntry, getPublicPrograms, getPublicWebsiteEntry } from "@/lib/cms";
import type { Locale } from "@/i18n/routing";

const checkoutPlanDetails: Record<CheckoutPlan, { slug: string; option: number }> = {
  "a-1": { slug: "personalised-online-fitness-coaching-90-days", option: 0 },
  "a-2": { slug: "personalised-online-fitness-coaching-90-days", option: 1 },
  "a-3": { slug: "personalised-online-fitness-coaching-90-days", option: 2 },
  "b-month": { slug: "move-and-grow", option: 0 },
  "d-month": { slug: "nourish-and-grow", option: 0 },
  "c-hour": { slug: "find-your-way-through", option: 0 },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contact" });
  return pageMetadata(locale, "/kontakt", t("title"), t("description"));
}

export default async function KontaktPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ adminPreview?: string; plan?: string }> }) {
  const { locale } = await params;
  const { adminPreview, plan } = await searchParams;
  setRequestLocale(locale);
  const isPreview = adminPreview === "contact";
  const entry = isPreview ? await getAdminPreviewEntry("website", "contact") : await getPublicWebsiteEntry("contact");
  const data = entry?.data as { eyebrow?: Record<string, string>; headline?: Record<string, string>; body?: Record<string, string>; submitLabel?: Record<string, string> } | undefined;
  const content = entry ? { eyebrow: data?.eyebrow?.[locale], headline: data?.headline?.[locale], body: data?.body?.[locale], submitLabel: data?.submitLabel?.[locale], image: entry.image_path } : undefined;
  const checkoutPlan = plan && plan in checkoutPlanDetails ? plan as CheckoutPlan : undefined;
  const detail = checkoutPlan ? checkoutPlanDetails[checkoutPlan] : undefined;
  const programs = detail ? await getPublicPrograms(locale as Locale) : [];
  const selectedProgram = detail ? programs.find((program) => program.slug === detail.slug) : undefined;
  const selectedPayment = selectedProgram
    ? selectedProgram.paymentOptions?.[detail!.option] ?? `${selectedProgram.price} ${selectedProgram.currency} · ${selectedProgram.duration}`
    : undefined;
  return <>{isPreview && <DraftPreviewBanner backHref="/admin/contact" />}<Contact content={content} selectedPayment={selectedPayment} checkoutPlan={selectedPayment ? checkoutPlan : undefined} locale={locale as Locale} /></>;
}
