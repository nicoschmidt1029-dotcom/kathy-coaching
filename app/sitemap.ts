import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-url";
import { routing } from "@/i18n/routing";
import { LEGAL_REVIEWED } from "@/components/legal";
import { TESTIMONIALS_ARE_REAL } from "@/lib/content-status";

/** Path → how often it changes / how important it is. */
const ROUTES = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/imprint", changeFrequency: "yearly", priority: 0.3, legal: true },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, legal: true },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Listing a noindex page in the sitemap asks crawlers to fetch something we
  // then tell them to drop. Each page comes back the moment its flag flips,
  // in the same commit that lifts its noindex.
  const routes = ROUTES.filter(
    (route) =>
      (LEGAL_REVIEWED || !("legal" in route)) &&
      (TESTIMONIALS_ARE_REAL || !("sample" in route))
  );

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      // Tell crawlers the three language versions are the same page.
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${BASE_URL}/${l}${route.path}`])
        ),
      },
    }))
  );
}
