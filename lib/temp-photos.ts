/**
 * Mixed media source of truth: some slots now hold Kathy's real assets
 * (hero video/poster, Train approach card, About portrait), others are
 * still curated Unsplash/Pexels stock waiting on real content.
 *
 * The "TEMP · slot · source" pill is rendered ONLY for entries that carry
 * a `credit` — real Kathy assets omit `credit` and render clean.
 *
 * To replace a remaining stock slot:
 *   1. Drop the real file into `/public/images/kathy/` (or similar)
 *   2. Swap the `url` here to the local path
 *   3. Delete the `credit` field so the TEMP pill disappears
 *
 * Or set an entry to `null` for the neutral styled placeholder.
 *
 * Slots currently on real Kathy content:
 *   - hero        →  /images/kathy/kathy-01.jpg (poster) + kathy-video-2.mp4
 *   - heroMovementDetail → /images/kathy/kathy-04.jpg (rendered top-right in hero)
 *   - approachTrain → /images/kathy/kathy-06.jpg (gym, blue top)
 *   - about        → /images/kathy/kathy-07.jpg (gym, purple top, mid-stretch)
 *
 * Slots still on stock (waiting on real content):
 *   - approachNourish, approachSoul (Unsplash atmospheric shots)
 *
 * Slots kept explicitly `null`:
 *   - spotlight  (Lena portrait — neutral placeholder stays until real photo)
 *
 * Do NOT use:
 *   - kathy-05.jpg       (too-tight selfie)
 *   - kathy-03.jpg       (phone video-editor screenshot — has UI chrome)
 *   - kathy-video-1.mp4  (a DIFFERENT person, not Kathy — removed from repo)
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
  | "spotlight"
  | "about",
  TempPhoto
> = {
  // Kathy's own — side-profile seated on the running track
  hero: {
    url: "/images/kathy/kathy-01.jpg",
    alt: "Kathy sitting on a running track, side profile",
  },
  // Kathy's own — track, seated side profile, arm extended in a pointing gesture
  heroMovementDetail: {
    url: "/images/kathy/kathy-04.jpg",
    alt: "Kathy seated on the running track, extending her arm in a dynamic gesture",
  },
  // Kathy's own — gym, blue top, crouched mid-workout (Train-the-body thread)
  approachTrain: {
    url: "/images/kathy/kathy-06.jpg",
    alt: "Kathy in the gym in a blue top, crouched mid-workout",
  },
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  approachNourish: {
    url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&q=80&auto=format&fit=crop",
    alt: "TEMP: buddha bowl with vegetables — atmospheric food shot for nutrition",
    credit: "Unsplash",
  },
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  approachSoul: {
    url: "https://images.unsplash.com/photo-1604745372175-27daa24a0a0e?w=900&q=80&auto=format&fit=crop",
    alt: "TEMP: candlelight and open book — quiet contemplative atmosphere",
    credit: "Unsplash",
  },
  // Kept null — neutral spotlight placeholder stays until Lena provides one
  spotlight: null,
  // Kathy's own — gym, purple top, stretching forward on the mat, looking
  // to camera. More distance / less selfie than the tight kathy-05 crop.
  about: {
    url: "/images/kathy/kathy-07.jpg",
    alt: "Portrait of Kathy stretching in the gym, looking toward the camera",
  },
};

// Kathy's own hero video — self-hosted from /public/images/kathy/
// (~1.4 MB, 478x850 portrait). object-cover center-crops it into the wide
// hero; the still hero photo above doubles as the poster frame.
// NB: kathy-video-1.mp4 showed a DIFFERENT person and was removed — do not use it.
export const TEMP_HERO_VIDEO: TempVideo = {
  src: "/images/kathy/kathy-video-2.mp4",
  poster: "/images/kathy/kathy-01.jpg",
};
