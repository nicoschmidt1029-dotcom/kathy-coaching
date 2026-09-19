import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { GiftCheckoutButton } from "@/components/site/gift-checkout-button";
import { DisplayTitle } from "@/components/site/display-title";
import { alternatesFor } from "@/i18n/metadata";
import type { Locale } from "@/i18n/routing";

const SUPPORT_BODY: Record<string, string> = {
  en: "Katey Coaching is a calling as much as it is a business. If this space speaks to you and you'd like to support the work, your gift is warmly welcome and deeply appreciated. Thank you for being part of this journey.",
  de: "Katey Coaching ist ebenso eine Berufung wie ein Unternehmen. Wenn dieser Raum dich anspricht und du diese Arbeit unterstützen möchtest, ist dein Geschenk herzlich willkommen und wird sehr geschätzt. Danke, dass du Teil dieser Reise bist.",
  sk: "Katey Coaching je poslaním rovnako ako podnikaním. Ak k vám tento priestor prehovára a chcete túto prácu podporiť, váš dar je srdečne vítaný a veľmi si ho vážim. Ďakujem, že ste súčasťou tejto cesty.",
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "supportMyWork" });
  return { title: t("heading"), description: SUPPORT_BODY[locale] ?? t("body"), alternates: alternatesFor(locale, "/support-my-work") };
}

export default async function SupportMyWorkPage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ gift?: string }> }) {
  const { locale } = await params;
  const { gift } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "supportMyWork" });
  const body = SUPPORT_BODY[locale] ?? t("body");

  return <main className="section-pad section-pad-top-tight">
    <div className="container-page">
      <div className="mx-auto max-w-3xl rounded-[1.75rem] bg-[var(--sand)] px-6 py-10 sm:px-10 md:py-14">
        <p className="eyebrow">{t("eyebrow")}</p>
        <DisplayTitle className="mt-4">{t("heading")}</DisplayTitle>
        <p className="mt-7 max-w-2xl text-lg leading-[1.8] text-foreground/72">{body}</p>
        {gift === "thank-you" && <p role="status" className="mt-6 rounded-xl bg-white/70 px-4 py-3 text-[var(--plum)]">{t("thankYou")}</p>}
        {gift === "cancelled" && <p role="status" className="mt-6 rounded-xl bg-white/70 px-4 py-3 text-foreground/72">{t("cancelled")}</p>}
        <div className="mt-8"><GiftCheckoutButton locale={locale as Locale} label={t("giveGift")} amountLabel={t("amountLabel")} amountHint={t("amountHint")} loadingLabel={t("loading")} errorLabel={t("error")} /></div>
      </div>
    </div>
  </main>;
}
