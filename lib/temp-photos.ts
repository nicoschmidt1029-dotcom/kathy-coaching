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
  // First curation attempt (Unsplash) missed tonally — 2 of 3 were B&W and
  // the third was a stock "woman-in-sunset" cliché that broke the "Meet
  // Katarina" moment. Reverted to styled placeholders until a new round of
  // curation (color portraits, face visible, warm light) — or, better,
  // Katarina's real photos — arrives.
  hero: null,
  spotlight: null,
  about: null,
};
