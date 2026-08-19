import { defineRouting } from "next-intl/routing";

/**
 * Locale routing for the site.
 *
 * English is the default and the complete reference version — de.json and
 * sk.json fall back to it key by key, so an untranslated section renders in
 * English rather than breaking. See messages/README.md for what still needs
 * translating.
 *
 * `localePrefix: "always"` means every URL carries its locale (/en, /de, /sk)
 * and `/` redirects to `/en`. That keeps the three language versions
 * symmetrical and unambiguous for both visitors and search engines.
 */
export const routing = defineRouting({
  locales: ["en", "de", "sk"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

/** Native language names, used by the switcher and the <html lang> attribute. */
export const LOCALE_LABELS: Record<Locale, { short: string; name: string }> = {
  en: { short: "EN", name: "English" },
  de: { short: "DE", name: "Deutsch" },
  sk: { short: "SK", name: "Slovenčina" },
};

/**
 * Locales whose copy has not been checked by a native speaker.
 *
 * Slovak was drafted by an AI, not written by Katarína and not reviewed by
 * anyone who speaks the language — the error risk is materially higher than
 * for German, which Nico supplied and can read. Visitors on a draft locale
 * get a quiet notice saying so, rather than being shown possibly-wrong copy
 * as if it were finished.
 *
 * Remove a locale from this list the moment its translation has been
 * reviewed; nothing else needs changing.
 */
// 2026-08-19: Nico asked for the draft banner removed outright rather than
// wait for Katarina's native-speaker review (see the risk note this leaves
// unresolved in messages/sk.json's _status block) — his explicit call, not
// a native-speaker sign-off. If she later flags SK phrasing as wrong, add
// "sk" back here rather than patching individual strings under pressure.
export const DRAFT_LOCALES: readonly Locale[] = [];

export function isDraftLocale(locale: string): locale is Locale {
  return (DRAFT_LOCALES as readonly string[]).includes(locale);
}
