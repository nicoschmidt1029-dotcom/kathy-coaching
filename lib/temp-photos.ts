/**
 * TEMP PLACEHOLDER PHOTOS — MUST BE REPLACED BEFORE LAUNCH.
 *
 * These are curated from Unsplash purely for tonal fit while the real
 * photography (of Katarina and real clients) is being produced. They are
 * hotlinked from images.unsplash.com and are **not** intended to ship in
 * a production launch.
 *
 * To replace:
 *   - Preferred: put a real image in `/public/photos/...`, then swap the
 *     `url` value below to `/photos/your-file.jpg`.
 *   - Or set an entry to `null` and the on-page styled placeholder will
 *     re-appear with an "add real photo" label so it can't be missed.
 *
 * A visible "TEMP · Unsplash · @photographer" pill is rendered on top of
 * every temp photo so nobody mistakes them for final assets.
 */

export type TempPhoto = {
  url: string;
  alt: string;
  credit: string;
} | null;

export const TEMP_PHOTOS: Record<"hero" | "spotlight" | "about", TempPhoto> = {
  // Hero video poster — warm, contemplative, cinematic frame feel
  hero: {
    url: "https://images.unsplash.com/photo-1749222013825-fe2025dcf0cf?w=1200&q=80&auto=format&fit=crop",
    alt: "TEMP: warm contemplative portrait — will be replaced with a poster frame from Katarina's real hero video",
    credit: "Joel Timothy · Unsplash",
  },
  // Spotlight testimonial (Lena) — quiet side profile, editorial
  spotlight: {
    url: "https://images.unsplash.com/photo-1611178206064-2ae27f72b9ca?w=900&q=80&auto=format&fit=crop",
    alt: "TEMP: quiet side-profile portrait — will be replaced with Lena's actual portrait or video snippet",
    credit: "Noah Blaine Clark · Unsplash",
  },
  // About (Katarina) — warm portrait
  about: {
    url: "https://images.unsplash.com/photo-1552838671-0e948f9f69b5?w=900&q=80&auto=format&fit=crop",
    alt: "TEMP: warm outdoor scene — will be replaced with Katarina's actual portrait",
    credit: "Sara Kurfeß · Unsplash",
  },
};
