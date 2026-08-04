# Kathy media — slot assignments

Source of truth: `lib/temp-photos.ts`. Real assets live in `public/images/kathy/`.

## Current slot mapping

| Slot | File | Where | Notes |
|------|------|-------|-------|
| `hero` (poster) | `kathy-01.jpg` | home hero | track, side profile seated |
| `TEMP_HERO_VIDEO` | `kathy-video-2.mp4` | home hero | 478×850 portrait, center-cropped |
| `heroMovementDetail` | `kathy-04.jpg` | home hero (top-right) | track, pointing gesture |
| `approachTrain` (Train the body) | `kathy-06.jpg` | `/about` | gym, blue top |
| `about` ("Meet Kathy") | `kathy-07.jpg` | `/about` | gym, purple top, mid-stretch |
| `approachNourish` | Unsplash stock | `/about` | placeholder (nutrition) |
| `approachSoul` | Unsplash stock | `/about` | placeholder (contemplative) |
| `spotlight` | `null` | `/testimonials` | neutral placeholder |

## Do NOT use

- `kathy-05.jpg` — too-tight selfie.
- `kathy-03.jpg` — phone video-editor screenshot (UI chrome visible).
- `kathy-video-1.mp4` — a **different person**, not Kathy. Removed from the repo.

## Unused but usable

- `kathy-02.jpg` — track, back to camera. Alt hero still, or a section accent.

## Missing / to be supplied by Kathy

- **Higher-res hero video.** `kathy-video-2.mp4` is only 478 px wide; upscaled to a
  full-bleed hero it stays soft. A landscape or higher-resolution clip would sharpen it.
- **A real head-on portrait** for "Meet Kathy" if `kathy-07` (side-on stretch) isn't
  ideal — direct eye contact, some breathing room.
- **Nutrition + faith imagery** to replace the two Unsplash stock threads
  (`approachNourish`, `approachSoul`) on `/about`.
- **Real client photos** for the `spotlight` testimonial (currently `null`).
