import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // No remotePatterns: every image on the site is now served from /public.
  // The Unsplash allowance existed only for two stock shots in the approach
  // section, which commissioned illustrations replaced.
  images: {},

  /**
   * The site is mostly one page. These keep every link already shared
   * alive: /de/about lands on /de#about rather than a 404.
   *
   * Temporary, not permanent — a 308 is cached by browsers forever, and if
   * any of these ever becomes its own page again that cache is unfixable.
   *
   * programme is NOT in this map — it graduated to a real route
   * (app/[locale]/programme/page.tsx), so redirecting it here would hijack
   * that page instead of serving it.
   */
  async redirects() {
    const anchors: Record<string, string> = {
      about: "about",
      testimonials: "approach",
      kontakt: "kontakt",
    };
    return Object.entries(anchors).map(([path, hash]) => ({
      source: `/:locale(en|de|sk)/${path}`,
      destination: `/:locale#${hash}`,
      permanent: false,
    }));
  },
};

export default withNextIntl(nextConfig);
