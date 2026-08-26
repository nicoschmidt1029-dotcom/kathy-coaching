import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ProgramDetail } from "@/components/site/program-detail";
import { DraftPreviewBanner } from "@/components/admin/draft-preview-banner";
import { alternatesFor } from "@/i18n/metadata";
import { routing, type Locale } from "@/i18n/routing";
import { PROGRAMS } from "@/lib/programs";
import { getAdminPreviewProgram, getPublicProgram } from "@/lib/cms";

export function generateStaticParams() {
  return PROGRAMS.map((program) => ({ slug: program.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const program = await getPublicProgram(slug, locale as Locale);
  if (!program) return {};
  return { title: program.title, description: program.kind === "conversation" ? program.intro : `${program.price} ${program.currency} / ${program.duration}`, alternates: alternatesFor(locale, `/programme/${slug}`) };
}

export default async function ProgramPage({ params, searchParams }: { params: Promise<{ locale: string; slug: string }>; searchParams: Promise<{ adminPreview?: string }> }) {
  const { locale, slug } = await params;
  const { adminPreview } = await searchParams;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const isPreview = adminPreview === "program";
  const program = isPreview ? await getAdminPreviewProgram(slug, locale as Locale) : await getPublicProgram(slug, locale as Locale);
  if (!program) notFound();
  return <>{isPreview && <DraftPreviewBanner backHref={`/admin/programs/${slug}`} />}<ProgramDetail program={program} locale={locale as Locale} /></>;
}
