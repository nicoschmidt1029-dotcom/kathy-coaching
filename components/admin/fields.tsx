const inputClass = "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-3 text-sm outline-none transition focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/15";

export function Field({ label, name, defaultValue = "", type = "text", required = false, readOnly = false }: { label: string; name: string; defaultValue?: string | number; type?: string; required?: boolean; readOnly?: boolean }) {
  return <label className="block text-sm font-medium text-foreground/75">{label}<input className={inputClass} name={name} type={type} defaultValue={defaultValue} required={required} readOnly={readOnly} /></label>;
}

export function TextArea({ label, name, defaultValue = "", rows = 4, hint }: { label: string; name: string; defaultValue?: string; rows?: number; hint?: string }) {
  return <label className="block text-sm font-medium text-foreground/75">{label}<textarea className={inputClass} name={name} defaultValue={defaultValue} rows={rows} />{hint && <span className="mt-1 block text-xs font-normal text-foreground/45">{hint}</span>}</label>;
}

export function LocaleFields({ locale, children }: { locale: "en" | "de" | "sk"; children: React.ReactNode }) {
  const names = { en: "English", de: "German", sk: "Slovak" };
  return <fieldset className="space-y-4 rounded-2xl border border-black/10 bg-white/45 p-4 sm:p-5"><legend className="px-2 font-display text-lg text-[var(--plum)]">{names[locale]}</legend>{children}</fieldset>;
}

export const panelClass = "rounded-2xl border border-black/10 bg-[#fbf8f2] p-5 shadow-sm sm:p-7";
