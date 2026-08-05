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
