/**
 * Visible placeholder for a fact only Katie can supply.
 *
 * Deliberately loud, and deliberately worded in plain English rather than
 * developer shorthand: whoever reads this page — visitor, client, or Katie
 * herself — must be able to tell at a glance that the information is missing,
 * not that it is written in some code they don't know.
 *
 * The children describe *what is needed*, never a sample value. A plausible
 * looking address, UID or insurer inside this pill would be worse than an
 * obvious gap: it invites someone to treat invented data as real.
 */
export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="mx-0.5 inline rounded bg-[oklch(0.94_0.06_78)] px-1.5 py-0.5 font-mono text-[0.72em] tracking-wide text-[oklch(0.35_0.09_50)] ring-1 ring-[oklch(0.75_0.09_60)]"
      title="This information has not been supplied yet."
    >
      <span className="sr-only">Still to be supplied: </span>
      <span aria-hidden>TO BE SUPPLIED · </span>
      {children}
    </span>
  );
}
