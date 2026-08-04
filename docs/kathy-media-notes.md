# Kathy media — slot assignments

Source of truth: `lib/temp-photos.ts`. Real assets live in `public/images/kathy/`.

## Current slot mapping (2026-08-04)

| Slot | File | Notes |
|------|------|-------|
| `hero` (poster) | `kathy-01.jpg` | track, side profile seated |
| `TEMP_HERO_VIDEO` | `kathy-video-1.mp4` | track, poster = kathy-01 |
| `approachTrain` (Train-the-body) | `kathy-07.jpg` | gym, mid-stretch on mat — swapped in from kathy-02 |
| `heroMovementDetail` (Movement-Detail) | `kathy-04.jpg` | track, pointing gesture — swapped in from Unsplash stock |
| `about` | `kathy-05.jpg` | gym portrait, head-on |
| `approachNourish` | Unsplash stock | still placeholder (nutrition) |
| `approachSoul` | Unsplash stock | still placeholder (contemplative) |
| `spotlight` | `null` | neutral placeholder |

## Open follow-ups

- **Movement-Detail** stays a **photo** for now. The `heroMovementDetail` slot is
  defined but **not yet rendered** in `components/site/hero.tsx` — making it visible
  is a separate, larger change (deferred). Later option: swap to `kathy-video-2.mp4`.
- `kathy-03.jpg` is a phone video-editor **screenshot** (UI chrome visible) — do NOT
  use it anywhere.
- `kathy-04.jpg`/`kathy-01.jpg` and `kathy-05.jpg`/`kathy-06.jpg` are near-duplicates.
