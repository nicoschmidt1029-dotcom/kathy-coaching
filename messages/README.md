# Translations — EN / DE / SK

`en.json` is the **complete reference version**. Every key the site renders
exists there. `de.json` and `sk.json` only contain what has actually been
translated; anything missing falls back to the English value at request time
(`i18n/request.ts` merges English underneath). So `/de` and `/sk` always render
a complete page — untranslated sections just show up in English.

## How to translate a section

1. Find the key path in `en.json` (e.g. `faq.believer.q`).
2. Recreate that path in `de.json` / `sk.json` and put the translation in.
3. Remove the section from the `_status.todo` list in that file.

Rules:

- **Never leave a key as an empty string** — that overrides the English with
  nothing. Delete the key instead.
- Keep the `<em>` / `<strong>` tags where they appear. They carry the
  typographic accent (italic display cut, emphasis) and are rendered as real
  markup, not printed as text.
- Placeholders in curly braces (`{name}`, `{year}`, `{percent}`) must survive
  the translation exactly as written.
- Slovak translations come from Katarína, not from machine translation.

## Status

| Section | Keys | DE | SK |
|---|---|---|---|
| `about` — bio paragraphs | `calling`, `story` | ✅ translated | ✅ translated (PDF original) |
| `about` — headings, caption, stats, qualifications | `eyebrow`, `title`, `portraitCaption`, `stat*`, `qual*` | ❌ English | ❌ English |
| `howIWork` — the four-step method | `eyebrow`, `title`, `intro`, `step1`–`step4` | ❌ English | ❌ English |
| `mission` — headline + body | `title`, `p1`–`p4` | ✅ translated | ✅ translated (PDF original) |
| `mission` — eyebrow | `eyebrow` | ❌ English | ❌ English |
| `hero` | all | ❌ English | ❌ English |
| `approach` (3 threads, teaser + full) | all | ❌ English | ❌ English |
| `programs` + `builder` + `pricing` | all | ❌ English | ❌ English |
| `testimonials` + `spotlight` | all | ❌ English | ❌ English |
| `faq` (5 Q&A) | all | ❌ English | ❌ English |
| `contact` (form labels, states) | all | ❌ English | ❌ English |
| `finalCta` | all | ❌ English | ❌ English |
| `nav`, `footer`, `wordmark`, `language`, `notFound` | all | ❌ English | ❌ English |
| `pages` (SEO titles + descriptions) | all | ❌ English | ❌ English |

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
