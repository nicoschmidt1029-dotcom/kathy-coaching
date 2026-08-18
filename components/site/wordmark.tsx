import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import logoImage from "@/public/images/logo/katey-coaching-full.png";
import logoImageOnDark from "@/public/images/logo/katey-coaching-full-ondark.png";

type Props = {
  className?: string;
  /** When true, renders the on-dark variant (footer, plum bands) */
  onDark?: boolean;
};

/*
  The real logo file Katarina sent (17 Aug) — KC monogram, "KATEY COACHING",
  the gold line + heart divider, and the "HEALTH · FITNESS · FAITH" tagline
  — used whole, everywhere, per her explicit correction (2026-08-18): the
  header was previously showing a version with the tagline row cropped off,
  and the footer was showing an entirely different, hand-built CSS wordmark
  with an outdated tagline ("Energie. Stärke. Du."). Neither was the actual
  logo; both are gone now.

  Two files, same artwork:
    - katey-coaching-full.png       — background keyed to transparency
      (ffmpeg colorkey) so it sits directly on the site's cream, not inside
      a visible rectangle. Not redrawn — same source photo Katarina sent,
      just the paper background removed and the outer empty margin cropped.
    - katey-coaching-full-ondark.png — the same file with only the
      near-black ink (the K/C monogram, "KATEY COACHING" and the tagline
      text) recoloured to a warm cream so it reads on the footer's dark
      petrol ground; the gold and olive artwork is untouched. This is a
      standard "logo on dark" variant, not a redraw — every shape, letter
      and proportion is identical to the light version.

  The image is proportioned closer to a square than a typical wide
  wordmark, since it's rendered whole (KC + name + tagline stacked), so it
  reads as a bigger block. Header/footer sizing gives it room to breathe
  and stay legible instead of cropping any part of it away.
*/
export function Wordmark({ className, onDark = false }: Props) {
  const t = useTranslations("wordmark");

  return (
    <Link
      href="/"
      aria-label={t("ariaLabel")}
      className="group inline-flex shrink-0 items-center"
    >
      <Image
        src={onDark ? logoImageOnDark : logoImage}
        alt={t("ariaLabel")}
        // Mobile base bumped from 112px to 150px (mobile-first pass,
        // 2026-08-18): at the 320-430px test widths only the base class
        // applies (sm: doesn't kick in until 640px), and 112px read as too
        // small relative to the header's other requirement (less vertical
        // padding) — 150px keeps the full lockup (monogram + name + gold
        // line + tagline) legible without the header needing extra height.
        // sm/md unchanged (128px / 148px) — this is a mobile-only change.
        // `className` (the size override, e.g. footer's wider 190px mobile
        // logo) is merged here via cn/twMerge — not on the outer Link — so
        // the passed width utility actually wins over these defaults
        // instead of just resizing an empty wrapper around a fixed-size img.
        className={cn(
          "h-auto w-[150px] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:w-[148px]",
          className
        )}
        priority
      />
    </Link>
  );
}
