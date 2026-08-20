import { deleteEntry, saveProgram } from "@/app/admin/actions";
import { ConfirmSubmit } from "@/components/admin/confirm-submit";
import { Field, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type ProgramData = { title?: Record<string, string>; subtitle?: Record<string, string>; description?: Record<string, string>; duration?: Record<string, string>; features?: Record<string, string[]>; ctaLabel?: Record<string, string>; ctaHref?: string; price?: number };

export function ProgramForm({ contentKey, entry, defaults }: { contentKey?: string; entry?: CmsEntry; defaults: ProgramData }) {
  const data = (entry?.data as ProgramData | undefined) ?? defaults;
  return <form action={saveProgram} className="space-y-6">
    <input type="hidden" name="content_key" value={contentKey ?? ""} />
    <section className={`${panelClass} space-y-5`}><div className="grid gap-4 sm:grid-cols-2"><Field label="Price (€)" name="price" type="number" defaultValue={data.price ?? 0} /><Field label="Display order" name="sort_order" type="number" defaultValue={entry?.sort_order ?? 0} /><Field label="Contact destination" name="cta_href" defaultValue={data.ctaHref ?? (contentKey ? `/kontakt?bundle=${contentKey}` : "/kontakt")} /></div><ImageUpload folder="programs" initialValue={entry?.image_path ?? ""} /></section>
    {locales.map((locale) => <LocaleFields key={locale} locale={locale}><Field label="Program title" name={`title_${locale}`} defaultValue={data.title?.[locale] ?? ""} required /><Field label="Short subtitle" name={`subtitle_${locale}`} defaultValue={data.subtitle?.[locale] ?? ""} /><TextArea label="Description" name={`description_${locale}`} defaultValue={data.description?.[locale] ?? ""} /><Field label="Duration" name={`duration_${locale}`} defaultValue={data.duration?.[locale] ?? ""} /><TextArea label="Features" name={`features_${locale}`} defaultValue={(data.features?.[locale] ?? []).join("\n")} hint="One feature per line" /><Field label="Button label" name={`cta_label_${locale}`} defaultValue={data.ctaLabel?.[locale] ?? ""} /></LocaleFields>)}
    <div className="flex flex-wrap gap-3 rounded-2xl border border-black/10 bg-[#fbf8f2]/95 p-4 shadow-lg backdrop-blur sm:sticky sm:bottom-3"><button name="status" value="draft" className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm">Save draft</button><button name="status" value="published" className="rounded-xl bg-[var(--plum)] px-5 py-2.5 text-sm text-white">Save & publish</button></div>
  </form>;
}

export function ProgramDeleteForm({ contentKey }: { contentKey: string }) {
  return <form action={deleteEntry} className="mt-8 border-t border-black/10 pt-6"><input type="hidden" name="content_type" value="program" /><input type="hidden" name="content_key" value={contentKey} /><ConfirmSubmit message="This cannot be undone. Delete this program?">Delete program</ConfirmSubmit></form>;
}
