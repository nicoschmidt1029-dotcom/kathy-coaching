import { notFound } from "next/navigation";
import { ProgramDeleteForm, ProgramForm, type ProgramData } from "@/components/admin/program-form";
import { getCmsEntries } from "@/lib/cms";
import { PROGRAMS } from "@/lib/programs";

export default async function EditProgram({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const program = PROGRAMS.find((item) => item.slug === key);
  const entry = (await getCmsEntries("program")).find((item) => item.content_key === key);
  if (!program && !entry) notFound();
  const defaults: ProgramData = program ? {
    image: program.image,
    kind: program.kind ?? "coaching",
    title: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.title])),
    intro: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.intro ?? ""])),
    targetHeading: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.targetHeading])),
    targetAudience: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.targetAudience])),
    transition: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.transition])),
    includesHeading: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.includesHeading])),
    includes: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.includes])),
    howHeading: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.howHeading ?? ""])),
    howSteps: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.howSteps ?? []])),
    howClosing: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.howClosing ?? ""])),
    paragraphs: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.paragraphs ?? []])),
    duration: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.duration])),
    ctaLabel: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.ctaLabel ?? ""])),
    secondaryCtaLabel: Object.fromEntries(Object.entries(program.content).map(([locale, content]) => [locale, content.secondaryCtaLabel ?? ""])),
    ctaHref: program.content.en.ctaHref,
    secondaryCtaHref: program.content.en.secondaryCtaHref,
    price: program.price,
    currency: program.currency,
  } : (entry!.data as ProgramData);
  return <><p className="eyebrow">Programs</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Edit program</h1><div className="mt-7"><ProgramForm contentKey={key} entry={entry} defaults={defaults} /><ProgramDeleteForm contentKey={key} /></div></>;
}
