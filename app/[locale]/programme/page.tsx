import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { alternatesFor } from "@/i18n/metadata";
import { Programs } from "@/components/site/programs";

/**
 * Programs, on its own page — split out of the one-pager on Katarina's
 * request ("one page yes but program should be an extra one"). Everything
 * else on the site is still a single scroll; this is the one exception.
 *
 * The builder is included here (bundlesOnly is left at its default,
 * false), unlike the version that used to sit on the home page — the
 * reasoning that kept it off the one-pager ("a calculator mid-scroll is a
 * wall") doesn't apply to a page someone navigated to specifically to
 * compare options.
 *
 * Bundle "choose this" links still point at `/?bundle=…#kontakt` (see
 * programs.tsx) — Contact lives on the home page, not here, so a
 * selection made on this page carries back there to the form.
 */
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

  return <Programs />;
}
