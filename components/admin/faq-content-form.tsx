import { saveFaqContent } from "@/app/admin/actions";
import { GuardedForm, SaveButton } from "@/components/admin/form-guard";
import { Field, LocaleFields, panelClass, TextArea } from "@/components/admin/fields";
import type { CmsEntry } from "@/lib/cms";

const locales = ["en", "de", "sk"] as const;
type FaqItem = { question: string; answer: string };
type FaqData = { headline?: Record<string, string>; body?: Record<string, string>; items?: Record<string, FaqItem[]> };

export function FaqContentForm({ entry, defaults }: { entry?: CmsEntry; defaults: FaqData }) {
  const data = (entry?.data as FaqData | undefined) ?? defaults;
  return <details className={panelClass}><summary className="cursor-pointer font-display text-2xl text-[var(--plum)]">Contact FAQs</summary><GuardedForm action={saveFaqContent} className="mt-6 space-y-5">{locales.map((locale) => <LocaleFields key={locale} locale={locale}><Field label="FAQ headline" name={`headline_${locale}`} defaultValue={data.headline?.[locale] ?? ""} /><TextArea label="Short introduction" name={`body_${locale}`} defaultValue={data.body?.[locale] ?? ""} rows={2} />{Array.from({ length: 5 }, (_, index) => { const item = data.items?.[locale]?.[index]; return <div key={index} className="space-y-3 rounded-xl border border-black/8 bg-white/65 p-4"><p className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">Question {index + 1}</p><Field label="Question" name={`question_${index}_${locale}`} defaultValue={item?.question ?? ""} /><TextArea label="Answer" name={`answer_${index}_${locale}`} defaultValue={item?.answer ?? ""} rows={3} /></div>; })}</LocaleFields>)}<div className="flex flex-wrap gap-3"><SaveButton value="published">Save & update website</SaveButton><SaveButton value="draft" variant="secondary">Save draft (not live)</SaveButton></div></GuardedForm></details>;
}
