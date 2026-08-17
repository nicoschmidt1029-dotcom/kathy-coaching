import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** When true, renders in cream on dark backgrounds (hero, plum bands) */
  onDark?: boolean;
};

export function Wordmark({ className, onDark = false }: Props) {
  const t = useTranslations("wordmark");
  // Always gold, never the site's petrol-blue --plum: this is Katey's actual
  // logo colour (her brand board is gold/mustard/beige), independent of
  // whatever the primary CTA colour happens to be.
  const markColor = onDark ? "var(--primary-foreground)" : "var(--clay)";

  return (
    <Link
      href="/"
      aria-label={t("ariaLabel")}
      className={cn(
        "group inline-flex items-center gap-2 leading-none",
        className
      )}
    >
      {/*
        Small mark after Katey's own logo: a figure with arms raised under a
        halo arc. Her brand board draws this large, with an apple, a dumbbell
        and a heart ringing it — too much detail to survive at wordmark
        size, so only the figure and the arc carry over; those two elements
        are what the eye actually registers first in her original.

        Redrawn (twice) for closer fidelity to her actual mark: the figure is
        four solid shapes — two arms, a head, a torso — in flat colour like a
        paper cutout, rather than thin stroked outlines, which read as a
        sketch rather than a logo at small sizes. Each shape also carries a
        matching stroke equal to its own fill: with several shapes
        overlapping, browsers can render a hairline anti-aliasing seam right
        at the boundary even though the colour is identical on both sides;
        the stroke "chokes" that seam shut. The small gap at each armpit is
        deliberate, not a bug — it is there in the reference too, where the
        raised arm and the neck don't touch.
      */}
      <svg
        aria-hidden
        viewBox="0 0 40 52"
        className="size-9 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:size-10"
      >
        {/* Halo arc — traced from Katey's own mark: it starts low on the
            left (roughly hip height), sweeps up over the head, and ends
            higher on the right, near where the apple sits in her full
            logo. Asymmetric on purpose, not a centred semicircle. */}
        <path
          d="M0 32 C -4 12, 14 -4, 20 -4 C 28 -4, 42 8, 38 20"
          fill="none"
          stroke={markColor}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        {/* One solid silhouette, like a paper cutout, rather than stroked
            outlines — arms, head and torso are each a filled shape in the
            same flat gold, so the seams between them disappear. */}
        <path
          d="M13 18.5 C 11 13, 9.5 8, 8.5 3 L 11.5 3 C 12.7 8, 14 13, 15.5 18 Z"
          fill={markColor}
          stroke={markColor}
          strokeWidth="0.6"
        />
        <path
          d="M27 18.5 C 29 13, 30.5 8, 31.5 3 L 28.5 3 C 27.3 8, 26 13, 24.5 18 Z"
          fill={markColor}
          stroke={markColor}
          strokeWidth="0.6"
        />
        <circle
          cx="20"
          cy="14.8"
          r="4.2"
          fill={markColor}
          stroke={markColor}
          strokeWidth="0.6"
        />
        <path
          d="M13 18.5 C 14.5 22, 16 25, 17 28 C 14 30.5, 12 32.5, 12 35 L 12 44 L 18 44 C 18.3 41, 18.8 38.3, 20 36 C 21.2 38.3, 21.7 41, 22 44 L 28 44 L 28 35 C 28 32.5, 26 30.5, 23 28 C 24 25, 25.5 22, 27 18.5 L 13 18.5 Z"
          fill={markColor}
          stroke={markColor}
          strokeWidth="0.6"
        />
      </svg>

      <span
        className={cn(
          "flex items-baseline gap-2",
          onDark ? "text-[var(--primary-foreground)]" : "text-foreground"
        )}
      >
        <span
          className="font-[family-name:var(--font-script)] text-[2.15rem] leading-none tracking-wide md:text-[2.5rem]"
          style={{ color: markColor }}
        >
          {t("name")}
        </span>
        <span
          className={cn(
            "hidden whitespace-nowrap font-mono text-[0.66rem] tracking-[0.3em] uppercase sm:inline md:text-[0.72rem]",
            onDark
              ? "text-[var(--primary-foreground)]/70"
              : "text-[var(--clay)]/85"
          )}
        >
          {t("tagline")}
        </span>
      </span>
    </Link>
  );
}
