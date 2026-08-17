import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
};

/**
 * Editorial portrait placeholder — used where a real photo will land later
 * but a plain grey box would look unfinished. Renders an italic "K"
 * monogram (the site's display serif, Instrument Serif) over a soft warm
 * gradient with a scattered line-art botanical pattern in gold, plus a
 * small brushstroke echoing the hero underline motif. Deliberately
 * abstract: no face, no silhouette, no AI portrait — reads as design, not
 * as person.
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
          "linear-gradient(160deg, var(--sand) 0%, oklch(0.90 0.010 76) 100%)",
      }}
    >
      {/* Scattered line-art botanical pattern — small leaves at low opacity
          give the surface an editorial book-page feel without competing
          with the monogram. */}
      <svg
        aria-hidden
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <g
          stroke="var(--clay)"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.32"
        >
          {/* Top-left leaf */}
          <g transform="translate(46 74) rotate(-32)">
            <path d="M -16 0 Q 0 -8 16 0 Q 0 8 -16 0 Z" />
            <line x1="-16" y1="0" x2="16" y2="0" strokeWidth="0.4" />
          </g>
          {/* Top-right small leaf */}
          <g transform="translate(238 58) rotate(48)">
            <path d="M -11 0 Q 0 -5 11 0 Q 0 5 -11 0 Z" />
            <line x1="-11" y1="0" x2="11" y2="0" strokeWidth="0.4" />
          </g>
          {/* Right-mid leaf */}
          <g transform="translate(266 172) rotate(88)">
            <path d="M -18 0 Q 0 -7 18 0 Q 0 7 -18 0 Z" />
            <line x1="-18" y1="0" x2="18" y2="0" strokeWidth="0.4" />
          </g>
          {/* Left-mid tiny leaf */}
          <g transform="translate(34 208) rotate(-72)">
            <path d="M -13 0 Q 0 -6 13 0 Q 0 6 -13 0 Z" />
            <line x1="-13" y1="0" x2="13" y2="0" strokeWidth="0.4" />
          </g>
          {/* Bottom-left leaf */}
          <g transform="translate(58 326) rotate(18)">
            <path d="M -17 0 Q 0 -7 17 0 Q 0 7 -17 0 Z" />
            <line x1="-17" y1="0" x2="17" y2="0" strokeWidth="0.4" />
          </g>
          {/* Bottom-right leaf */}
          <g transform="translate(242 336) rotate(-56)">
            <path d="M -14 0 Q 0 -6 14 0 Q 0 6 -14 0 Z" />
            <line x1="-14" y1="0" x2="14" y2="0" strokeWidth="0.4" />
          </g>
          {/* A single trailing stem for movement */}
          <path
            d="M 20 380 Q 90 350 130 372 T 210 358"
            strokeWidth="0.6"
            opacity="0.65"
          />
        </g>
      </svg>

      {/* Very soft radial glow behind the letter */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(closest-side at 50% 44%, oklch(0.92 0.012 78 / 0.32), transparent 62%)",
        }}
      />

      {/* Italic display-serif monogram */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          aria-hidden
          className="font-display italic leading-none text-[var(--plum)]/72"
          style={{
            fontSize: "clamp(7rem, 26vw, 13rem)",
            transform: "translateY(-4%)",
            fontWeight: 300,
          }}
        >
          K
        </span>
      </div>

      {/* Brushstroke arc under the K — kept as the signature detail */}
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
          strokeWidth="3"
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
