import { saveWebsiteContent } from "@/app/admin/actions";
import { Field, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { ImageUpload } from "@/components/admin/image-upload";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type WebsiteData = { headline?: Record<string, string>; body?: Record<string, string> };

export function WebsiteContentForm({ contentKey, title, entry, defaults }: { contentKey: string; title: string; entry?: CmsEntry; defaults: WebsiteData }) {
  const data = (entry?.data as WebsiteData | undefined) ?? defaults;
  return <details className={panelClass} open><summary className="cursor-pointer font-display text-2xl text-[var(--plum)]">{title}</summary><form action={saveWebsiteContent} className="mt-6 space-y-5"><input type="hidden" name="content_key" value={contentKey} /><ImageUpload folder="website" initialValue={entry?.image_path ?? ""} />{locales.map((locale) => <LocaleFields key={locale} locale={locale}><Field label="Headline" name={`headline_${locale}`} defaultValue={data.headline?.[locale] ?? ""} /><TextArea label="Text" name={`body_${locale}`} defaultValue={data.body?.[locale] ?? ""} rows={7} hint="Separate paragraphs with a blank line" /></LocaleFields>)}<div className="flex flex-wrap gap-3"><button name="status" value="draft" className="rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm">Save draft</button><button name="status" value="published" className="rounded-xl bg-[var(--plum)] px-5 py-2.5 text-sm text-white">Save & publish</button></div></form></details>;
}
