const inputClass = "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/15";

export function Field({ label, name, defaultValue = "", type = "text", required = false, readOnly = false }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean; readOnly?: boolean }) {
  return <label className="block text-sm font-medium text-foreground/75">{label}<input className={inputClass} name={name} type={type} defaultValue={defaultValue} required={required} readOnly={readOnly} /></label>;
}

export function TextArea({ label, name, defaultValue = "", rows = 4, hint }: { label: string; name: string; defaultValue?: string; rows?: number; hint?: string }) {
  return <label className="block text-sm font-medium text-foreground/75">{label}<textarea className={inputClass} name={name} defaultValue={defaultValue} rows={rows} />{hint && <span className="mt-1 block text-xs font-normal text-foreground/45">{hint}</span>}</label>;
}

export function LocaleFields({ locale, children }: { locale: "en" | "de" | "sk"; children: React.ReactNode }) {
  const names = { en: "English", de: "German", sk: "Slovak" };
  return <details open={locale === "en"} className="group rounded-2xl border border-black/10 bg-white/45"><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 font-display text-lg text-[var(--plum)] sm:px-5"><span>{names[locale]}</span><span className="font-sans text-xs font-normal text-foreground/45 group-open:hidden">Open translation</span><span className="hidden font-sans text-xs font-normal text-foreground/45 group-open:inline">Hide</span></summary><fieldset className="space-y-4 border-t border-black/8 p-4 sm:p-5"><legend className="sr-only">{names[locale]} content</legend>{children}</fieldset></details>;
}

export function LanguageEditingNote() {
  return <aside className="rounded-2xl border border-[var(--clay)]/20 bg-[var(--sand)]/45 p-4 text-sm leading-relaxed text-foreground/65"><p className="font-medium text-[var(--plum)]">One save updates the whole website</p><p className="mt-1">Images, price, order and publishing apply to every language automatically. Text keeps a separate English, German and Slovak version so visitors never receive a false translation. Open only the language you need, then save once at the bottom.</p><Link href="/admin/tutorials#languages" className="mt-2 inline-block text-[var(--plum)] underline underline-offset-4">Read: Editing the three languages</Link></aside>;
}

export const panelClass = "rounded-2xl border border-black/10 bg-[#fbf8f2] p-5 shadow-sm sm:p-7";
import Link from "next/link";
