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
  the gold line, and the "HEALTH · FITNESS · FAITH" tagline — used whole,
  everywhere, per her explicit correction (2026-08-18): the
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

  2026-08-19: the small gold heart that sat centred on the horizontal line
  above the tagline is removed, per Katarina's request to simplify the
  mark — she wanted to see it without that extra accent. Both files were
  edited the same way: an ffmpeg geq pass cleared the heart's bounding box
  to transparent and redrew the line's exact 4px/#9E7F54 band straight
  through the gap, sampled from the untouched line on either side, so the
  line itself reads as continuous rather than interrupted. The larger
  heart woven into the KC monogram's decorative line (part of the "KC
  monogram" proper, not this divider) is untouched — only the small one on
  the lower line is gone.
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
        // 2026-08-18), then trimmed to 136px in the same-day follow-up
        // pass: 150px read as heavier than the small hamburger icon it
        // sits opposite across the header row (justify-between already
        // gives both ends equal padding, so the mismatch was visual
        // weight, not spacing) — 136px keeps the full lockup legible
        // while balancing better against the icon. sm/md unchanged
        // (128px / 148px) — this is a mobile-only change.
        // `className` (the size override, e.g. footer's mobile logo) is
        // merged here via cn/twMerge — not on the outer Link — so the
        // passed width utility actually wins over these defaults instead
        // of just resizing an empty wrapper around a fixed-size img.
        className={cn(
          "h-auto w-[136px] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:w-[148px]",
          className
        )}
        priority
      />
    </Link>
  );
}
