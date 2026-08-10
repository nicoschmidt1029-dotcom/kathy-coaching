import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/site/hero";
import { ApproachTeaser } from "@/components/site/approach-teaser";
import { ProgramsTeaser } from "@/components/site/programs-teaser";
import { HomeFinalCta } from "@/components/site/home-final-cta";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ApproachTeaser />
      <ProgramsTeaser />
      <HomeFinalCta />
    </>
  );
}
