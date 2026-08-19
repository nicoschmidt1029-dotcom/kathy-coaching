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
 *   - heroBlazer  →  /images/kathy/kathy-13-contact-closeup.jpg (Contact page — close-up portrait)
 *   - heroMovementDetail → /images/kathy/kathy-07.jpg (gym, purple top, mid-stretch)
 *   - about        → /images/kathy/kathy-12-katey-seated.jpg (Katey page — seated, black outfit, light-blue track)
 *
 * 2026-08-19: heroBlazer, about, programsIntro and homeBand (Mission) all
 * moved to a new set of photos following Katarina's stated future
 * direction for her imagery — black outfit, light-blue floor/track,
 * clean and calm, minimal color variation, red-floor shots no longer the
 * main direction. Every photo they replaced stays in the repo, unused,
 * rather than being deleted.
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
 * approachSoul was soul.png, a commissioned line illustration (candle/
 * book/cup) — replaced 2026-08-18 the same way as approachNourish, with a
 * real photographic still life Katarina supplied directly (open Bible,
 * lit candle, mug, olive branches, warm wood table) — see
 * soul-bible-candle-styling.png.
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
  /** Lighter, audio-stripped re-encode for the mobile hero card — falls
   *  back to `src` if not set. Mobile networks stalling on the full
   *  desktop file (5Mbps, unused audio track) was why the mobile hero
   *  video wasn't playing smoothly. */
  srcMobile?: string;
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
  // Katey's own — replaced 2026-08-19 (client sent a new set of black-outfit
  // / light-blue-floor photos, her stated future direction for all Katey
  // imagery). Close-up portrait, natural light, warm and personal — used
  // beside the Contact form. The old blazer portrait (kathy-blazer.jpg)
  // stays in the repo, unused.
  heroBlazer: {
    url: "/images/kathy/kathy-13-contact-closeup.jpg",
    alt: "Close-up portrait of Katey smiling gently, resting her chin on her hand",
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
  // Was a commissioned line illustration (book, candle, leaves) — not a
  // photo of Katey, since she was explicit that this thread shouldn't show
  // her a second/third time in a row. Replaced 2026-08-18 with a real
  // photographic still life she supplied directly (open Bible, lit candle,
  // mug, olive branches, warm wood table) — same soft, warm, sand-toned
  // editorial direction, now as an actual photo instead of an illustration.
  // The old illustration file stays in the repo, just unassigned.
  approachSoul: {
    url: "/images/soul/soul-bible-candle-styling.png",
    alt: "An open Bible, a lit candle, a mug and olive branches on a warm wooden table",
  },
  // Katey's own — replaced 2026-08-19: new standing portrait, black outfit,
  // light-blue track, holding her water bottle, hand on hip — part of the
  // consistent black-outfit/light-blue-floor direction she wants going
  // forward. Previous photo here (kathy-02.jpg, seated from behind) stays
  // in the repo, unused.
  homeBand: {
    url: "/images/kathy/kathy-11-mission-bottle.jpg",
    alt: "Katey standing on a light-blue running track in a black outfit, hand on hip, holding a water bottle",
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
  // Katey's own — replaced 2026-08-19: the previous court-shade photo read
  // as too blue/dark with too much contrast. New shot: dynamic wide-legged
  // stretch on the light-blue track, black outfit, landscape orientation —
  // same black-outfit/light-blue-floor direction, calmer and less busy.
  // kathy-10-court-shade.jpg stays in the repo, unused.
  programsIntro: {
    url: "/images/kathy/kathy-14-programs-stretch.jpg",
    alt: "Katey in a wide-legged stretch on a light-blue running track, arms extended",
  },
  // Katey's own — replaced 2026-08-19: seated side profile on the track,
  // black outfit, looking off into the distance — part of the new
  // consistent black-outfit/light-blue-floor image direction. The old
  // red-track photo (kathy-01.jpg) stays in the repo, unused; the client
  // was explicit that red-floor imagery shouldn't be the main direction
  // going forward.
  about: {
    url: "/images/kathy/kathy-12-katey-seated.jpg",
    alt: "Katey sitting on a light-blue running track in a black outfit, side profile, looking into the distance",
  },
};

// Katey's own — pike push-up into a mobility flow (crawl/lunge), cut
// together from two clips she sent 16/17 Aug (see components/site/hero.tsx
// for how it's cropped into the full-bleed hero). Replaces the still blazer
// portrait, per her request to show her actually training instead of a
// posed shot. kathy-video-2.mp4 stays in the repo, unused, for later reuse.
export const TEMP_HERO_VIDEO: TempVideo = {
  src: "/videos/workout-hero.mp4",
  // Swapped 2026-08-18 to a different clip Katarina sent specifically for
  // mobile: a genuine portrait-shot (9:16) workout video, not a crop of
  // the landscape desktop clip. Re-encoded from her 512x910/49.5MB original
  // down to 480x854/5.7MB — no audio track, faststart, CRF 26 — same
  // treatment as the previous mobile file, just built from better-fitting
  // source footage (near-identical aspect to a phone screen, so the
  // full-bleed mobile hero needs almost no cropping).
  srcMobile: "/videos/workout-hero-mobile.mp4",
};
