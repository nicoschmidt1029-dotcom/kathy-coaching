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
  const markColor = onDark ? "var(--primary-foreground)" : "var(--plum)";

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
        viewBox="0 0 26 32"
        className="size-7 shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      >
        {/* Halo arc, open at the bottom */}
        <path
          d="M2 15 C 2 5, 9 1, 13 1 C 17 1, 24 5, 24 15"
          fill="none"
          stroke={markColor}
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        {/* Arms, raised in a V from the shoulders */}
        <path
          d="M9.5 12 C 8 9, 6.3 7, 5 4.5"
          fill="none"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M16.5 12 C 18 9, 19.7 7, 21 4.5"
          fill="none"
          stroke={markColor}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* Head */}
        <circle cx="13" cy="10.4" r="2.1" fill={markColor} />
        {/* Torso, tapered at the waist */}
        <path
          d="M9.6 13.6 C 8.6 16.4, 8.7 19.3, 10 22 L 16 22 C 17.3 19.3, 17.4 16.4, 16.4 13.6 C 15 12.6, 11 12.6, 9.6 13.6 Z"
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
          className="font-[family-name:var(--font-script)] text-[1.85rem] leading-none tracking-wide md:text-[2.15rem]"
          style={{ color: markColor }}
        >
          {t("name")}
        </span>
        <span
          className={cn(
            "font-mono text-[0.62rem] tracking-[0.3em] uppercase md:text-[0.68rem]",
            onDark
              ? "text-[var(--primary-foreground)]/70"
              : "text-[var(--plum)]/75"
          )}
        >
          {t("tagline")}
        </span>
      </span>
    </Link>
  );
}
