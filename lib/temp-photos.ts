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
 *   - hero        →  /images/kathy/kathy-01.jpg (poster) + kathy-video-1.mp4
 *   - approachTrain → /images/kathy/kathy-02.jpg
 *   - about        → /images/kathy/kathy-05.jpg
 *
 * Slots still on stock (waiting on real content):
 *   - heroMovementDetail (Unsplash — currently unused in hero markup)
 *   - approachNourish, approachSoul (Unsplash atmospheric shots)
 *
 * Slots kept explicitly `null`:
 *   - spotlight  (Lena portrait — neutral placeholder stays until real photo)
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
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  heroMovementDetail: {
    url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&auto=format&fit=crop",
    alt: "TEMP: close-up of hands gripping dumbbells, no face — atmospheric detail",
    credit: "Unsplash",
  },
  // Kathy's own — back turned, seated leaning on arms, same session as hero
  approachTrain: {
    url: "/images/kathy/kathy-02.jpg",
    alt: "Kathy on the track, back to camera, seated pause between sets",
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
  // Kathy's own — face close-up (indoor gym setting; palette differs from
  // the outdoor track shots but this is the only real head-on portrait)
  about: {
    url: "/images/kathy/kathy-05.jpg",
    alt: "Portrait of Kathy",
  },
};

// Kathy's own hero video — self-hosted from /public/images/kathy/
// (~2.3 MB, mp4). The still hero photo above doubles as the poster frame.
export const TEMP_HERO_VIDEO: TempVideo = {
  src: "/images/kathy/kathy-video-1.mp4",
  poster: "/images/kathy/kathy-01.jpg",
};
