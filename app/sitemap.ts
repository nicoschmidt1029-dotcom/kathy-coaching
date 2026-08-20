import type { MetadataRoute } from "next";
import { SITE_URL as BASE_URL } from "@/lib/site-url";
import { routing } from "@/i18n/routing";
import { LEGAL_REVIEWED } from "@/components/legal";
import { TESTIMONIALS_ARE_REAL } from "@/lib/content-status";
import { getPublicPrograms, getPublicRecipes } from "@/lib/cms";

/** Path → how often it changes / how important it is. */
const ROUTES = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/katey", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mission", changeFrequency: "monthly", priority: 0.6 },
  { path: "/programme", changeFrequency: "monthly", priority: 0.9 },
  { path: "/recipes", changeFrequency: "monthly", priority: 0.8 },
  { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
  { path: "/imprint", changeFrequency: "yearly", priority: 0.3, legal: true },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3, legal: true },
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  // Listing a noindex page in the sitemap asks crawlers to fetch something we
  // then tell them to drop. Each page comes back the moment its flag flips,
  // in the same commit that lifts its noindex.
  const routes = ROUTES.filter(
    (route) =>
      (LEGAL_REVIEWED || !("legal" in route)) &&
      (TESTIMONIALS_ARE_REAL || !("sample" in route))
  );

  const staticPages = routes.flatMap((route) =>
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

  const [recipes, programs] = await Promise.all([
    getPublicRecipes("en"),
    getPublicPrograms("en"),
  ]);
  const recipePages = recipes.flatMap((recipe) =>
    routing.locales.map((locale) => {
      const path = `/recipes/${recipe.slug}`;
      return {
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      };
    })
  );

  const programPages = programs.flatMap((program) =>
    routing.locales.map((locale) => {
      const path = `/programme/${program.slug}`;
      return {
        url: `${BASE_URL}/${locale}${path}`,
        lastModified,
        changeFrequency: "monthly" as const,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
          ),
        },
      };
    })
  );

  return [...staticPages, ...programPages, ...recipePages];
}
