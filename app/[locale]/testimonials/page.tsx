import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { SpotlightTestimonial } from "@/components/site/spotlight-testimonial";
import { Testimonials } from "@/components/site/testimonials";
import { HomeFinalCta } from "@/components/site/home-final-cta";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.testimonials" });
  return {
    title: t("title"),
    description: t("description"),
    alternates: alternatesFor(locale, "/testimonials"),
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SpotlightTestimonial />
      <Testimonials />
      <HomeFinalCta />
    </>
  );
}
