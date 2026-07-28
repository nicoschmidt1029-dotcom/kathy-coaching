/**
 * STOCK PLACEHOLDER assets — MUST BE REPLACED WITH KATHY'S OWN CONTENT
 * BEFORE LAUNCH.
 *
 * These are curated stock (Unsplash / Pexels) picked purely for atmospheric
 * neutrality while Kathy's real photography and video footage are being
 * produced. They are hotlinked (images) or self-hosted from /public/videos
 * (video) and MUST NOT ship to a public launch as-is.
 *
 * A visible "TEMP · slot · source" pill is rendered on top of every stock
 * asset so nobody mistakes them for final content.
 *
 * To replace:
 *   1. Preferred: put the real asset in `/public/...` and swap the `url`
 *      here to the local path.
 *   2. Or set an entry to `null` and the neutral styled placeholder
 *      returns on the page with an "add real photo" label.
 *
 * Slots kept explicitly `null` on request (neutral placeholder stays):
 *   - about (Kathy portrait)
 *   - spotlight (Lena portrait)
 *   - testimonial before/after (Marcus, Hannah, Sophie)
 */

export type TempPhoto = {
  url: string;
  alt: string;
  credit: string;
} | null;

export type TempVideo = {
  src: string;
  poster?: string;
  credit: string;
} | null;

// STOCK PLACEHOLDER – replace with Kathy's own content before launch
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
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  hero: {
    url: "https://images.unsplash.com/photo-1751456357787-fe644b095838?w=1600&q=80&auto=format&fit=crop",
    alt: "TEMP: woman performing a barbell deadlift in a gym — will be replaced with a hero photo of Kathy",
    credit: "Unsplash",
  },
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  heroMovementDetail: {
    url: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=600&q=80&auto=format&fit=crop",
    alt: "TEMP: close-up of hands gripping dumbbells, no face — atmospheric detail",
    credit: "Unsplash",
  },
  // STOCK PLACEHOLDER – replace with Kathy's own content before launch
  // Same URL as `hero` on purpose — same atmospheric training reference
  // in both the hero background and the Train approach card until Kathy's
  // own photography arrives.
  approachTrain: {
    url: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80&auto=format&fit=crop",
    alt: "TEMP: barbell overhead press training — will be replaced with a photo of Kathy",
    credit: "Unsplash",
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
  // Kept null on request — neutral placeholder stays until real portrait arrives
  spotlight: null,
  about: null,
};

// STOCK PLACEHOLDER – replace with Kathy's own video before launch
// Pexels: "A Woman Lifting A Barbell" by cottonbro studio
// (pexels.com/video/a-woman-lifting-a-barbell-7674502/). Self-hosted from
// /public/videos so we don't depend on Pexels CDN availability. UHD 2732x1440,
// ~18 MB — Kathy's own footage should replace this at a smaller optimised
// size (target ≤ 5 MB, ~1080p h.264 with CRF 24 or an AV1/HEVC equivalent).
export const TEMP_HERO_VIDEO: TempVideo = {
  src: "/videos/hero-placeholder.mp4",
  poster:
    "https://images.unsplash.com/photo-1751456357787-fe644b095838?w=1600&q=80&auto=format&fit=crop",
  credit: "Pexels · cottonbro studio",
};
