import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import logoImage from "@/public/images/logo/katey-coaching-monogram.png";

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

  if (!onDark) {
    /*
      Header/light-background variant: the real logo file Katarina sent
      (17 Aug), cropped down to just the mark — "KC" monogram, leaf,
      dumbbell, gold heart line — with the background keyed out to
      transparency (ffmpeg colorkey) so it sits directly on the header's
      cream, not inside a visible rectangle. Not redrawn or rebuilt from
      text, per Katarina's explicit instruction — this is the same
      artwork, just cropped tighter and the paper background removed.

      The "KATEY COACHING" wordmark and "HEALTH · FITNESS · FAITH"
      tagline rows are dropped from this crop: at header scale (~110–
      150px wide) they read as illegible grey noise, and Katarina asked
      for the tagline to be optional and the header to prioritise a
      clean mark over full lockup text. Width-constrained now, not
      height-constrained — the monogram-only crop is a wide ~8:5 mark,
      not a near-square badge, so a width target actually fits.
    */
    return (
      <Link
        href="/"
        aria-label={t("ariaLabel")}
        className={cn(
          "group inline-flex shrink-0 items-center",
          className
        )}
      >
        <Image
          src={logoImage}
          alt={t("ariaLabel")}
          className="h-auto w-[104px] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 sm:w-[122px] md:w-[136px]"
          priority
        />
      </Link>
    );
  }

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
        Small mark after the new "KC" monogram Katarina sent (17 Aug):
        a serif "K" with a script "C" swashed through it, black, with a
        gold leaf/dumbbell/heart sprig underneath — replaces the earlier
        raised-arms figure, which followed her older brand board.

        Only the two interlocked letters carry over here — the leaf,
        dumbbell and heart accents were already dropped from the old mark
        at this size for the same reason (illegible below ~14px), and
        that reasoning applies just as much to a second set of accents.
        Built from the site's own two display faces rather than traced
        paths: K in Instrument Serif, C in Pinyon Script, overlapped with
        a negative margin — text glyphs hold up at small sizes in a way
        hand-drawn letterforms this fine usually don't.

        Monogram colour is independent of `markColor` (which is the
        wordmark's gold): the reference logo's K/C are solid black, only
        the decorative sprig around it is gold, so the letters use
        --foreground/cream instead of gold even though the script name
        beside them stays gold.
      */}
      <span
        aria-hidden
        className="relative inline-flex shrink-0 items-center transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
        style={{ width: "1.5em", height: "1em", fontSize: "2.25rem" }}
      >
        <span
          className="absolute left-0 top-[0.02em] font-[family-name:var(--font-display)] text-[0.72em] leading-none"
          style={{ color: onDark ? "var(--primary-foreground)" : "var(--foreground)" }}
        >
          K
        </span>
        <span
          className="absolute left-[0.34em] top-[-0.16em] font-[family-name:var(--font-script)] text-[0.92em] leading-none"
          style={{ color: onDark ? "var(--primary-foreground)" : "var(--foreground)" }}
        >
          C
        </span>
      </span>

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
