import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
};

/**
 * Editorial portrait placeholder — used where a real photo will land later
 * but a plain grey box would look unfinished. Renders a Fraunces italic
 * "K" drop-cap on a warm sand→clay gradient with a small brushstroke
 * echoing the hero underline motif. Deliberately abstract: no face, no
 * silhouette, no AI-generated portrait — a placeholder that reads as
 * design, not as person.
 */
export function PortraitPlaceholder({ label, className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-[3/4] w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10",
        className
      )}
      style={{
        background:
          "linear-gradient(155deg, var(--sand) 0%, oklch(0.86 0.05 42) 100%)",
      }}
    >
      {/* Soft radial glow behind the letter, low-intensity clay wash */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 42%, oklch(0.88 0.06 42 / 0.35), transparent 65%)",
        }}
      />

      {/* Faint diagonal grain so the surface reads as textured, not flat */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 18px)",
          color: "var(--plum)",
        }}
      />

      {/* Fraunces italic drop-cap K */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className="font-display italic leading-none text-[var(--plum)]/75"
          style={{
            fontSize: "clamp(7rem, 26vw, 13rem)",
            transform: "translateY(-4%)",
            fontWeight: 400,
          }}
        >
          K
        </span>
      </div>

      {/* Brushstroke arc under the K, echoing the hero signature underline */}
      <svg
        aria-hidden
        viewBox="0 0 200 20"
        preserveAspectRatio="none"
        className="absolute bottom-[24%] left-1/2 w-[42%] -translate-x-1/2"
      >
        <path
          d="M 6 14 C 46 4, 130 4, 194 12"
          fill="none"
          stroke="var(--clay)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Label — kept per brief so nobody mistakes this for the final asset */}
      <div className="absolute inset-x-0 bottom-5 flex flex-col items-center gap-1">
        <span className="caption text-foreground/55">{label}</span>
        <span className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-foreground/45">
          placeholder · add real photo
        </span>
      </div>
    </div>
  );
}
