import type { Metadata } from "next";
import { routing } from "./routing";

/**
 * Canonical + hreflang block for one page.
 *
 * Every page has to pass its own path, otherwise the layout's alternates are
 * inherited and each subpage ends up advertising the three *home* pages as
 * its translations.
 *
 * @param locale the locale being rendered — becomes the canonical URL
 * @param path   route without locale prefix, e.g. "/about" ("" for home)
 */
export function alternatesFor(locale: string, path = ""): Metadata["alternates"] {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `/${l}${path}`])
    ),
  };
}
