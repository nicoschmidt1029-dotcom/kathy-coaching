import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProgramDetail } from "@/components/site/program-detail";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { PROGRAMS } from "@/lib/programs";
import { getPublicProgram } from "@/lib/cms";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const program = await getPublicProgram(slug, locale as Locale);
  if (!program) return {};
  return { title: program.title, description: `${program.price} ${program.currency} / ${program.duration}`, alternates: alternatesFor(locale, `/programme/${slug}`) };
}

export default async function ProgramPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const program = await getPublicProgram(slug, locale as Locale);
  if (!program) notFound();
  return <ProgramDetail program={program} locale={locale as Locale} />;
}
