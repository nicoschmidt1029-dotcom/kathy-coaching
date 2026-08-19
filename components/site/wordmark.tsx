import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import logoImage from "@/public/images/logo/katey-coaching-full-subline.png";
import logoImageOnDark from "@/public/images/logo/katey-coaching-full-subline-ondark.png";

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

  2026-08-19, second pass — "*-balanced" files: the flat lockup renders the
  monogram and the "KATEY COACHING" + tagline text at whatever proportion
  they happened to be drawn at, which made the K/C read oversized (860px
  of the 1000x860 canvas, 74%) against a comparatively small, hard-to-read
  wordmark row. No redraw: split the original file into its monogram block
  (top 640px) and its text block (bottom 220px), scaled the monogram down
  (0.82x) and the text up (1.15x) independently, then recomposited both on
  a new transparent canvas with a deliberate 30px gap between them. Same
  artwork, same colors, same relative left/right balance within each
  block — only the monogram-to-text size ratio and the gap changed. Done
  identically for both the light and on-dark variant so they stay in sync.
  New canvas is 1150x808 (was 1000x860) — wider and shorter, since the
  text block is now proportionally the wider element.

  2026-08-19, third pass — "*-subline" files: Katarina asked specifically
  for the "HEALTH · FITNESS · FAITH" tagline to be bigger (it's baked into
  this flat artwork, not CSS text, so there's no font-size to tweak — this
  is an image edit, not a style change). Isolated just the tagline-text
  crop from the "*-balanced" file (the gold line and "KATEY COACHING"
  above it are untouched) and scaled it 1.2x uniformly (both axes, so
  letterforms and tracking aren't distorted) — a +20% size bump, in the
  middle of the 15-25% asked for. The monogram+name+line block is copied
  in at its exact "*-balanced" pixel size, unscaled. Because the enlarged
  tagline is now wider than the block above it, the canvas widened from
  1150 to 1380px (826px tall) to fit it without clipping or squeezing;
  both are still centered on it. Wordmark's rendered width was bumped
  accordingly (see below) so the monogram/name render at the *same*
  on-screen pixel size as the previous pass — only the tagline actually
  reads bigger.
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
        // while balancing better against the icon.
        // 2026-08-19: switched to the "*-balanced" artwork (see file
        // comment above), which is wider/shorter than the old 1000x860
        // canvas. Width bumped 136px -> 148px (mobile) and 148px -> 168px
        // (md) to compensate for the new shorter aspect ratio — net
        // result is a slightly *shorter* rendered logo than before at
        // both sizes (monogram reads smaller) while "KATEY COACHING" and
        // the tagline render at a visibly larger, more legible pixel
        // size, per Katarina's request.
        // 2026-08-19, third pass: switched to "*-subline" artwork (see
        // file comment above), whose canvas widened 1150->1380px without
        // the monogram/name block itself changing size. Width bumped
        // 148px -> 178px (mobile) and 168px -> 202px (md) — solved for
        // the exact value that keeps the monogram+name block's on-screen
        // pixel size identical to the previous pass; the tagline is the
        // only part that actually renders larger (~20%).
        // `className` (the size override, e.g. footer's mobile logo) is
        // merged here via cn/twMerge — not on the outer Link — so the
        // passed width utility actually wins over these defaults instead
        // of just resizing an empty wrapper around a fixed-size img.
        className={cn(
          "h-auto w-[178px] object-contain transition-transform duration-300 ease-out group-hover:-translate-y-0.5 md:w-[202px]",
          className
        )}
        priority
      />
    </Link>
  );
}
