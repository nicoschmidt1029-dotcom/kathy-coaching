import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Programs } from "@/components/site/programs";
import { Faq } from "@/components/site/faq";

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

  return (
    <>
      <Programs />
      <Faq />
    </>
  );
}
