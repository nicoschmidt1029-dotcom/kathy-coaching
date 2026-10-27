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

/** Complete per-page search and sharing metadata for a localized route. */
export function pageMetadata(
  locale: string,
  path: string,
  title: string,
  description: string,
): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: { title, description, type: "website", url: `/${locale}${path}`, locale },
    twitter: { card: "summary_large_image", title, description },
  };
}
