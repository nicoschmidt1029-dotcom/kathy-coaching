/**
 * Mixed media source of truth: some slots now hold Katie's real assets
 * (hero video/poster, Train approach card, About portrait), others are
 * still curated Unsplash/Pexels stock waiting on real content.
 *
 * The "TEMP · slot · source" pill is rendered ONLY for entries that carry
 * a `credit` — real Katie assets omit `credit` and render clean.
 *
 * To replace a remaining stock slot:
 *   1. Drop the real file into `/public/images/kathy/` (or similar)
 *   2. Swap the `url` here to the local path
 *   3. Delete the `credit` field so the TEMP pill disappears
 *
 * Or set an entry to `null` for the neutral styled placeholder.
 *
 * Slots currently on real Katie content:
 *   - hero        →  /images/kathy/kathy-blazer.jpg (still; hero video disabled)
 *   - heroMovementDetail → /images/kathy/kathy-01.jpg (track profile, top-right of hero)
 *   - approachTrain → /images/kathy/kathy-06.jpg (gym, blue top)
 *   - about        → /images/kathy/kathy-07.jpg (gym, purple top, mid-stretch)
 *
 * Slots still on stock (waiting on real content):
 *   - approachNourish, approachSoul (Unsplash atmospheric shots)
 *
 * The testimonial slots are gone entirely rather than sitting here as `null`:
 * the people quoted are invented, so there was never a photo coming. See
 * lib/content-status.ts.
 *
 * Unused but kept in repo:
 *   - kathy-02.jpg (track, back view), kathy-04.jpg (track, pointing),
 *     kathy-video-2.mp4 (real Katie clip — reusable later)
 *
 * Do NOT use:
 *   - kathy-05.jpg       (too-tight selfie)
 *   - kathy-03.jpg       (phone video-editor screenshot — has UI chrome)
 *   - kathy-video-1.mp4  (a DIFFERENT person, not Katie — removed from repo)
 */

export type TempPhoto = {
  url: string;
  alt: string;
  /** When present, a TEMP pill is overlaid — meant for stock/placeholder assets. */
  credit?: string;
} | null;

export type TempVideo = {
  src: string;
  poster?: string;
  /** Same convention: pill only appears if this is set. */
  credit?: string;
} | null;

export const TEMP_PHOTOS: Record<
  | "hero"
  | "heroMovementDetail"
  | "approachTrain"
  | "approachNourish"
  | "approachSoul"
  | "programsBand"
  | "about",
  TempPhoto
> = {
  // Katie's own — editorial portrait: beige blazer, leaning on a sunlit wall
  hero: {
    url: "/images/kathy/kathy-blazer.jpg",
    alt: "Katie in a beige blazer, leaning against a sunlit wall, looking to the side",
  },
  // Katie's own — running track, seated side profile (moved from the hero slot)
  heroMovementDetail: {
    url: "/images/kathy/kathy-01.jpg",
    alt: "Katie sitting on a running track, side profile",
  },
  // Katie's own — gym, blue top, crouched mid-workout (Train-the-body thread)
  approachTrain: {
    url: "/images/kathy/kathy-06.jpg",
    alt: "Katie in the gym in a blue top, crouched mid-workout",
  },
  // Commissioned line illustration — terracotta on cream, drawn for this site.
  // Replaced an Unsplash buddha bowl: stock food photography made the thread
  // look like a recipe blog, and it was the only image not of Katie's world.
  approachNourish: {
    url: "/images/illustrations/nourish.png",
    alt: "Line illustration: a table with a bowl of grains, vegetables, a jug and a folded cloth",
  },
  // Commissioned line illustration — same hand as the Nourish one, so the
  // three threads read as one set instead of two photos and a drawing.
  approachSoul: {
    url: "/images/illustrations/soul.png",
    alt: "Line illustration: an open book beside a lit candle, a cup and a sprig of leaves",
  },
  // Katie's own — running track, seated, looking off. The programs page was
  // the only one with no photo of her at all: three cards, a price table and
  // a calculator. This puts a person back into it.
  programsBand: {
    url: "/images/kathy/kathy-04.jpg",
    alt: "Katie sitting on a running track, looking into the distance",
  },
  // Katie's own — gym, purple top, stretching forward on the mat, looking
  // to camera. More distance / less selfie than the tight kathy-05 crop.
  about: {
    url: "/images/kathy/kathy-07.jpg",
    alt: "Portrait of Katie stretching in the gym, looking toward the camera",
  },
};

// Hero video disabled — the hero now uses the still blazer portrait above.
// kathy-video-2.mp4 (real Katie, 478x850) stays in the repo for later reuse;
// kathy-video-1.mp4 was a DIFFERENT person and was removed.
export const TEMP_HERO_VIDEO: TempVideo = null;
