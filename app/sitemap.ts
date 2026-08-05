import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-url";
import { routing } from "@/i18n/routing";

/** Path → how often it changes / how important it is. */
const ROUTES = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/programme", changeFrequency: "monthly", priority: 0.8 },
  { path: "/testimonials", changeFrequency: "monthly", priority: 0.6 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/imprint", changeFrequency: "yearly", priority: 0.3 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.flatMap((route) =>
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
