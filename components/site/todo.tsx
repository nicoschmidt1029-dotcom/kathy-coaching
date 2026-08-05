/**
 * Visible placeholder for a fact only Katie can supply.
 *
 * Deliberately loud: an unfilled TODO must never read as finished copy, and
 * must never quietly ship as an invented number. Everything wrapped in this
 * is waiting on real information.
 */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline rounded bg-[oklch(0.94_0.06_78)] px-1.5 py-0.5 font-mono text-[0.72em] tracking-wide text-[oklch(0.35_0.09_50)] ring-1 ring-[oklch(0.75_0.09_60)]">
      TODO · {children}
    </span>
  );
}
