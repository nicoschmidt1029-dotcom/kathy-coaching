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
      */}
      <svg
        aria-hidden
        viewBox="0 0 28 34"
        className="size-9 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:size-10"
      >
        {/* Halo arc — a near-full circle, open at the base, wider than the
            figure it rings. Traced from the arc in Katey's own mark. */}
        <path
          d="M3 21 C -1 10, 5 1, 14 1 C 23 1, 29 10, 25 21"
          fill="none"
          stroke={markColor}
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        {/* Arms, raised in a V from the shoulders */}
        <path
          d="M10.6 16.2 C 9.2 12.6, 7.9 9, 7.2 5.4"
          fill="none"
          stroke={markColor}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <path
          d="M17.4 16.2 C 18.8 12.6, 20.1 9, 20.8 5.4"
          fill="none"
          stroke={markColor}
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        {/* Head */}
        <circle cx="14" cy="14.5" r="2.5" fill={markColor} />
        {/* Torso, tapered at the waist, cropped flat at mid-thigh */}
        <path
          d="M10.7 17.3 C 9.3 20.4, 9.4 23.8, 11.1 27 L 16.9 27 C 18.6 23.8, 18.7 20.4, 17.3 17.3 C 15.4 16, 12.6 16, 10.7 17.3 Z"
          fill={markColor}
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
