/**
 * Mixed media source of truth: some slots now hold Katey's real assets
 * (hero video/poster, Train approach card, About portrait), others are
 * still curated Unsplash/Pexels stock waiting on real content.
 *
 * The "TEMP · slot · source" pill is rendered ONLY for entries that carry
 * a `credit` — real Katey assets omit `credit` and render clean.
 *
 * To replace a remaining stock slot:
 *   1. Drop the real file into `/public/images/kathy/` (or similar)
 *   2. Swap the `url` here to the local path
 *   3. Delete the `credit` field so the TEMP pill disappears
 *
 * Or set an entry to `null` for the neutral styled placeholder.
 *
 * Slots currently on real Katey content:
 *   - hero        →  /images/kathy/kathy-blazer-wide.png (blazer portrait, background AI-widened by Katarina herself)
 *   - heroBlazer  →  /images/kathy/kathy-blazer.jpg (the original, un-widened crop — not currently rendered)
 *   - heroMovementDetail → /images/kathy/kathy-07.jpg (gym, purple top, mid-stretch)
 *   - approachTrain → /images/kathy/kathy-06.jpg (gym, blue top)
 *   - about        → /images/kathy/kathy-01.jpg (running track, side profile)
 *
 * about was kathy-07 (gym) until the gold/mustard rebrand — the gym's neon
 * green wall clashed hard with the new palette and there is no tool here to
 * repaint just the background without touching her skin/face too, so the
 * slot moved to the track photo instead, which is warm-toned already.
 * kathy-07 stays assigned to heroMovementDetail, which no component
 * currently renders, so it is effectively unused but easy to bring back.
 *
 * hero briefly ran an Unsplash stock photo (sunset yoga silhouette) while
 * waiting on a real one wide enough for a full-bleed background. Katarina
 * sent kathy-blazer-wide.png instead — her own blazer portrait with the
 * background extended (she had this generated herself), so the real photo
 * now fills that role directly. heroBlazer (the un-widened original) and
 * the stock silhouette both stay out of the render path but easy to bring
 * back if needed — see hero.tsx and git history for the stock photo file.
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
 *     kathy-video-2.mp4 (real Katey clip — reusable later)
 *
 * Do NOT use:
 *   - kathy-05.jpg       (too-tight selfie)
 *   - kathy-03.jpg       (phone video-editor screenshot — has UI chrome)
 *   - kathy-video-1.mp4  (a DIFFERENT person, not Katey — removed from repo)
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
  | "heroBlazer"
  | "heroMovementDetail"
  | "approachTrain"
  | "approachNourish"
  | "approachSoul"
  | "programsBand"
  | "homeBand"
  | "about",
  TempPhoto
> = {
  // Katey's own — the beige-blazer portrait, background extended wide (she
  // had this done herself). Widescreen with her kept to the left third and
  // open sunlit wall to the right, built for exactly this use: a full-bleed
  // hero with real headroom for text that doesn't have to sit over her.
  hero: {
    url: "/images/kathy/kathy-blazer-wide.png",
    alt: "Katey in a beige blazer, leaning against a sunlit wall, looking to the side, with open wall space to the right",
  },
  // Katey's own — editorial portrait: beige blazer, leaning on a sunlit wall.
  // Kept here, one edit away, for whenever the hero should go back to a real
  // photo of her instead of the stock silhouette above.
  heroBlazer: {
    url: "/images/kathy/kathy-blazer.jpg",
    alt: "Katey in a beige blazer, leaning against a sunlit wall, looking to the side",
  },
  // Katey's own — gym, purple top, stretching forward on the mat. Not
  // currently rendered anywhere (no component reads this slot); kept
  // assigned rather than set to null so it is one edit away from reuse.
  heroMovementDetail: {
    url: "/images/kathy/kathy-07.jpg",
    alt: "Katey stretching in the gym, looking toward the camera",
  },
  // Katey's own — running track, seen from behind. Was the HomeBand photo
  // (a standalone full-bleed pause section between Approach and How I Work);
  // Katarina didn't like the gym photo that used to be here and asked for
  // the HomeBand photo moved into this slot instead, so HomeBand is retired
  // and this thread carries it. Warm track red/green also reads better next
  // to the gold palette than the gym did.
  approachTrain: {
    url: "/images/kathy/kathy-02.jpg",
    alt: "Katey sitting on a running track, seen from behind, looking down the lane",
  },
  // Commissioned line illustration — terracotta on cream, drawn for this site.
  // Replaced an Unsplash buddha bowl: stock food photography made the thread
  // look like a recipe blog, and it was the only image not of Katey's world.
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
  // Katey's own — running track, seated from behind, looking down the lane.
  // Was the home page's standalone full-bleed pause section; that section
  // is retired and this same photo now lives in Approach's first thread
  // instead (see approachTrain above). Kept assigned here, one edit away,
  // in case the pause section comes back with a different photo later.
  homeBand: {
    url: "/images/kathy/kathy-02.jpg",
    alt: "Katey sitting on a running track, seen from behind, looking down the lane",
  },
  // Katey's own — running track, seated, looking off. Was the full-bleed
  // band under the Programs pricing cards; Katarina asked for that band
  // removed (the three drawn block-icons on the "Der ganze Weg" card now do
  // the work of putting something visual into that gap instead). Kept
  // assigned here, one edit away, for reuse elsewhere.
  programsBand: {
    url: "/images/kathy/kathy-04.jpg",
    alt: "Katey sitting on a running track, looking into the distance",
  },
  // Katey's own — running track, seated side profile, looking off into the
  // distance. Warm red track and greenery read gold rather than clashing,
  // which the gym photo formerly here did not.
  about: {
    url: "/images/kathy/kathy-01.jpg",
    alt: "Portrait of Katey sitting on a running track, side profile",
  },
};

// Hero video disabled — the hero now uses the still blazer portrait above.
// kathy-video-2.mp4 (real Katey, 478x850) stays in the repo for later reuse;
// kathy-video-1.mp4 was a DIFFERENT person and was removed.
export const TEMP_HERO_VIDEO: TempVideo = null;
