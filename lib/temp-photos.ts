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
 *   - about        → /images/kathy/kathy-01.jpg (running track, side profile)
 *
 * approachTrain is a real Katey photo (kathy-08-stretch.jpg) — see its own
 * comment below.
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
 * approachNourish was kathy-04.jpg (running track) — didn't communicate
 * nutrition at all, and kathy-04 is also used a second time on programsBand
 * (separate, unrelated duplicate — programsBand isn't currently rendered
 * anywhere live, see below). Replaced 2026-08-18 with a commissioned/
 * AI-generated editorial food-styling photo Katarina supplied directly
 * (hands arranging figs, olives, walnuts and bread on a wood board — warm,
 * natural light, on-palette) — see nourish-fig-bread-styling.png.
 *
 * Slots still needing real content (2026-08-18 review):
 *   - approachSoul renders soul.png, a commissioned line illustration
 *     (candle/book/cup) for "Seele & Identität in Jesus" — real photography
 *     was requested to replace it (warm, reflective, faith-themed — e.g. an
 *     open Bible in natural light, hands near it, quiet still life; NOT
 *     cartoon/line-art, not a posed "praying model" stock shot). No local
 *     asset fits; needs a real sourced/commissioned photo. Left as-is.
 *
 * The testimonial slots are gone entirely rather than sitting here as `null`:
 * the people quoted are invented, so there was never a photo coming. See
 * lib/content-status.ts.
 *
 * Unused but kept in repo:
 *   - kathy-02.jpg (track, back view), kathy-04.jpg (track, pointing),
 *     kathy-06.jpg (gym, blue top — was approachTrain before it moved to
 *     an illustration), kathy-video-2.mp4 (real Katey clip — reusable later)
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
  | "programsIntro"
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
  // Katey's own — new stretch/lunge shot on the track (sent 17 Aug), replacing
  // the block-training illustration. She asked for this thread specifically to
  // go back to a real photo; Nourish and Soul are still illustrations pending
  // real photos for those two themes (see note above the record).
  approachTrain: {
    url: "/images/kathy/kathy-08-stretch.jpg",
    alt: "Katey mid-stretch on a running track, arms and legs extended",
  },
  // Katey's own — running track, seated, relaxed, looking off into the
  // distance. Replaces the commissioned line illustration: Katarina asked
  // for all three Approach threads to run real photos, not a mix of photos
  // and drawings, even where there's no literal food photo of hers — same
  // shoot/grade as approachTrain so it still reads as one consistent set.
  approachNourish: {
    url: "/images/nourish/nourish-fig-bread-styling.png",
    alt: "Hands arranging halved figs, olives, walnuts and fresh bread on a rustic wooden board, warm natural light",
  },
  // Commissioned line illustration — book, candle, leaves — not a photo of
  // Katey. She was explicit that this thread shouldn't show her a second/
  // third time in a row; this illustration already matches the soft,
  // warm, sand-toned editorial direction she asked for as its
  // replacement, so no new asset was needed. kathy-02.jpg (the photo this
  // slot briefly held) is still assigned to homeBand, unused elsewhere.
  approachSoul: {
    url: "/images/illustrations/soul.png",
    alt: "Line illustration: an open book beside a lit candle, a cup and a sprig of leaves",
  },
  // Katey's own — running track, seated from behind, looking down the lane.
  // Was the home page's standalone full-bleed pause section; that section
  // is retired (HomeBand isn't imported/rendered anywhere) so this slot was
  // effectively dead. Reassigned 2026-08-18 to the Mission page (see
  // mission.tsx) — Mission previously reused the `hero` blazer portrait,
  // which is the same photo (just AI-widened) as the Contact page's photo,
  // a duplication bug. This is a different shoot/pose, still warm-toned and
  // on-brand, and genuinely unused elsewhere on the live site.
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
  // Katey's own — new photo (sent 17 Aug), drinking from a bottle mid-session,
  // same shoot/grade as approachTrain — sits beside the intro text at the top
  // of the Programs page.
  programsIntro: {
    url: "/images/kathy/kathy-09-bottle.jpg",
    alt: "Katey drinking water during a training session",
  },
  // Katey's own — running track, seated side profile, looking off into the
  // distance. Warm red track and greenery read gold rather than clashing,
  // which the gym photo formerly here did not.
  about: {
    url: "/images/kathy/kathy-01.jpg",
    alt: "Portrait of Katey sitting on a running track, side profile",
  },
};

// Katey's own — pike push-up into a mobility flow (crawl/lunge), cut
// together from two clips she sent 16/17 Aug (see components/site/hero.tsx
// for how it's cropped into the full-bleed hero). Replaces the still blazer
// portrait, per her request to show her actually training instead of a
// posed shot. kathy-video-2.mp4 stays in the repo, unused, for later reuse.
export const TEMP_HERO_VIDEO: TempVideo = {
  src: "/images/kathy/kathy-hero-video.mp4",
};
