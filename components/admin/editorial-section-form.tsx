import Link from "next/link";
import { saveEditorialSection } from "@/app/admin/actions";
import { EDITORIAL_SECTION_FIELDS, type EditorialSectionKey } from "@/lib/admin-section-fields";
import { Field, LanguageEditingNote, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type SectionData = Record<string, Partial<Record<(typeof locales)[number], string>>>;

export function EditorialSectionForm({ contentKey, title, description, entry, defaults, preview }: { contentKey: EditorialSectionKey; title: string; description: string; entry?: CmsEntry; defaults: SectionData; preview: string }) {
  const stored = (entry?.data as SectionData | undefined) ?? {};
  const data = { ...defaults, ...stored };
  const fields = EDITORIAL_SECTION_FIELDS[contentKey];

  return <details className={panelClass}><summary className="cursor-pointer font-display text-2xl text-[var(--plum)]">{title}</summary><p className="mt-2 text-sm leading-relaxed text-foreground/55">{description}</p><div className="mt-5"><LanguageEditingNote /></div><GuardedForm action={saveEditorialSection} className="mt-6 space-y-5"><input type="hidden" name="content_key" value={contentKey} />{locales.map((locale) => <LocaleFields key={locale} locale={locale}>{fields.map((field) => field.multiline ? <TextArea key={field.key} label={field.label} name={`${field.key}_${locale}`} defaultValue={data[field.key]?.[locale] ?? ""} rows={4} /> : <Field key={field.key} label={field.label} name={`${field.key}_${locale}`} defaultValue={data[field.key]?.[locale] ?? ""} />)}</LocaleFields>)}<div className="flex flex-wrap items-center gap-3"><SaveButton value="draft" variant="secondary">Save draft</SaveButton><SaveButton value="published">Save & publish</SaveButton><Link href={preview} target="_blank" className="inline-flex min-h-11 items-center rounded-xl px-4 text-sm text-[var(--plum)] underline underline-offset-4">Preview page</Link></div></GuardedForm></details>;
}
