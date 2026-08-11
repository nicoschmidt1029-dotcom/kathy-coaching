import { useTranslations } from "next-intl";

/**
 * Visible placeholder for a fact only Katey can supply.
 *
 * Deliberately loud, and worded in the visitor's language rather than
 * developer shorthand: whoever reads this page — visitor, client, or Katey
 * herself — must be able to tell at a glance that the information is missing.
 *
 * The children describe *what is needed*, never a sample value. A plausible
 * looking address, UID or insurer inside this pill would be worse than an
 * obvious gap: it invites someone to treat invented data as real. Callers
 * pass those descriptions already translated.
 */
export function Todo({ children }: { children: React.ReactNode }) {
  const t = useTranslations("legal");

  return (
    <span
      className="mx-0.5 inline rounded bg-[oklch(0.94_0.06_78)] px-1.5 py-0.5 font-mono text-[0.72em] tracking-wide text-[oklch(0.35_0.09_50)] ring-1 ring-[oklch(0.75_0.09_60)]"
      title={t("notSuppliedYet")}
    >
      <span className="sr-only">{t("stillToBeSupplied")} </span>
      <span aria-hidden>{t("toBeSupplied")} · </span>
      {children}
    </span>
  );
}
