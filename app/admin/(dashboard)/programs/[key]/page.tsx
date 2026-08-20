import { notFound } from "next/navigation";
import { ProgramDeleteForm, ProgramForm } from "@/components/admin/program-form";
import { getCmsEntries } from "@/lib/cms";
import { BUNDLES } from "@/lib/pricing";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";

const messages = { en, de, sk };

export default async function EditProgram({ params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;
  const bundle = BUNDLES.find((item) => item.id === key);
  const entries = await getCmsEntries("program");
  const entry = entries.find((item) => item.content_key === key);
  if (!bundle && !entry) notFound();
  const defaults = bundle ? {
    title: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, msg.pricing.bundles[bundle.id].name])),
    subtitle: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, msg.pricing.bundles[bundle.id].scope])),
    description: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, msg.pricing.bundles[bundle.id].blurb])),
    duration: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, msg.pricing.duration])),
    features: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, [...bundle.blocks.map((id) => msg.pricing.blocks[id].name), ...bundle.addons.map((id) => msg.pricing.addons[id].name)]])),
    ctaLabel: Object.fromEntries(Object.entries(messages).map(([locale, msg]) => [locale, msg.programs.chooseBundle])),
    ctaHref: `/kontakt?bundle=${key}`,
    price: bundle.price,
  } : (entry!.data as Parameters<typeof ProgramForm>[0]["defaults"]);
  return <><p className="eyebrow">Programs</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Edit program</h1><div className="mt-7"><ProgramForm contentKey={key} entry={entry} defaults={defaults} /><ProgramDeleteForm contentKey={key} /></div></>;
}
