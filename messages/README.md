# Translations — EN / DE / SK

`en.json` is the **complete reference version**. Every key the site renders
exists there. `de.json` and `sk.json` only contain what has actually been
translated; anything missing falls back to the English value at request time
(`i18n/request.ts` merges English underneath). So `/de` and `/sk` always render
a complete page — untranslated sections just show up in English.

## How to translate a section

1. Find the key path in `en.json` (e.g. `faq.believer.q`).
2. Recreate that path in `de.json` / `sk.json` and put the translation in.
3. Update the `_status` block in that file.

Rules:

- **Never leave a key as an empty string** — that overrides the English with
  nothing. Delete the key instead.
- Keep the `<em>` / `<strong>` tags where they appear. They carry the
  typographic accent (italic display cut, emphasis) and are rendered as real
  markup, not printed as text.
- Placeholders in curly braces (`{name}`, `{year}`, `{percent}`) must survive
  the translation exactly as written.
- The Slovak bio and mission are Katarína's own words and are quoted
  verbatim, including the English fragments she left in them ("calling",
  "Let me tell you"). Do not tidy those up without asking her.

## Status

**DE is complete** — 213 of the 221 keys are translated and the remaining
eight are intentional (brand name, wordmark, the two issuing institutions,
and the language list, which reads the same in every language).

**SK is a draft and has not been reviewed by a native speaker.** Only the
bio and mission come from Katarína; everything else was drafted by an AI,
which carries a materially higher error risk than the German — Nico
supplied that text and can read it back. Until someone checks it, `sk` is
listed in `DRAFT_LOCALES` (`i18n/routing.ts`) and every page on `/sk`
carries a quiet notice saying the translation is still being reviewed.
**After review: remove `sk` from `DRAFT_LOCALES` and update the `_status`
block in `sk.json`.**

| Section | Keys | DE | SK |
|---|---|---|---|
| `about` — bio paragraphs | `calling`, `story` | ✅ from Nico | ✅ Katarína's PDF original |
| `mission` — headline + body | `title`, `p1`–`p4` | ✅ from Nico | ✅ Katarína's PDF original |
| `hero` | all | ✅ translated | ⚠️ AI draft |
| `approach` (3 threads, teaser + full) | all | ✅ translated | ⚠️ AI draft |
| `programs` + `builder` + `pricing` | all | ✅ translated | ⚠️ AI draft |
| `testimonials` + `spotlight` | all | ✅ translated | ⚠️ AI draft |
| `contact` (form labels, states) | all | ✅ translated | ⚠️ AI draft |
| `nav` + `language` | all | ✅ translated | ⚠️ AI draft |
| `about` — headings, caption, stats, qualifications | `eyebrow`, `title`, `portraitCaption`, `stat*`, `qual*` | ✅ translated | ⚠️ AI draft |
| `howIWork` — the four-step method | all | ✅ translated | ⚠️ AI draft |
| `mission` — eyebrow | `eyebrow` | ✅ translated | ⚠️ AI draft |
| `faq` (5 Q&A) | all | ✅ translated | ⚠️ AI draft |
| `finalCta` | all | ✅ translated | ⚠️ AI draft |
| `footer`, `notFound` | all | ✅ translated | ⚠️ AI draft |
| `pages` (SEO titles + descriptions) | all | ✅ translated | ⚠️ AI draft |
| `translationNotice` | `draft` | — (not shown) | ⚠️ AI draft |

Every section on `/sk` is now drafted; nothing falls back to English except
the brand name, the wordmark, the two issuing institutions and the language
list, all of which read the same in any language.

### Not in the message files at all (English only, by design)

- **`/imprint` and `/privacy` bodies** — legal texts, hardcoded in
  `app/[locale]/imprint/page.tsx` and `.../privacy/page.tsx`. Not
  machine-translated on purpose: the German and Slovak versions need someone
  who can stand behind them. Their SEO title/description *are* in
  `pages.imprint` / `pages.privacy` and can be translated.
- **The Open Graph card** (`app/[locale]/opengraph-image.tsx`) — one English
  image for all three locales. Its headline is hand-split across two lines
  (roman + italic accent), so localizing it means picking a line break per
  language, not just swapping a string.
- **Image alt texts** (`lib/temp-photos.ts`) — tied to the temporary photo
  slots; worth localizing once the final photos are in.

## The name of the method

`approach.systemName` ("The Three Threads Approach") is the site-wide name of
Katie's method. It is rendered on the home page, on `/about` and on
`/programme` from this single key — renaming the method means editing one
line per locale, nothing else. **Katie still has to confirm the final
wording.** When translating, decide per language whether the name is
translated or kept in English as a brand term.

## Adding a fourth locale

1. Add the code to `locales` and `LOCALE_LABELS` in `i18n/routing.ts`.
2. Create `messages/<code>.json` (an `_status` block is enough to start).

Routing, the switcher, `hreflang` tags and the sitemap all read from that
list — nothing else needs touching.
