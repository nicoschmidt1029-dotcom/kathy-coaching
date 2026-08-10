import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { About } from "@/components/site/about";
import { Mission } from "@/components/site/mission";
import { Approach } from "@/components/site/approach";
import { HowIWork } from "@/components/site/how-i-work";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.about" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/about"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Who → what the method is → how it actually runs → why it matters */}
      <About />
      <Approach />
      <HowIWork />
      {/* Mission carries the closing CTA — see the note in mission.tsx. */}
      <Mission />
    </>
  );
}
