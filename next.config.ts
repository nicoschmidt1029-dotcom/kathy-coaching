import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // No remotePatterns: every image on the site is now served from /public.
  // The Unsplash allowance existed only for two stock shots in the approach
  // section, which commissioned illustrations replaced.
  images: {},

  /**
   * Keeps every link already shared alive after the site moved from a
   * one-page scroll to real per-section routes (Katarina's request):
   * /de/about now lands on /de/katey rather than a 404.
   *
   * Temporary, not permanent — a 308 is cached by browsers forever, and if
   * any of these old paths ever needs a different destination that cache
   * is unfixable.
   *
   * programme and kontakt are NOT in this map — both are real routes
   * (app/[locale]/programme, app/[locale]/kontakt), so redirecting them
   * here would hijack the page instead of serving it.
   */
  async redirects() {
    const destinations: Record<string, string> = {
      about: "katey",
      testimonials: "katey",
    };
    return Object.entries(destinations).map(([from, to]) => ({
      source: `/:locale(en|de|sk)/${from}`,
      destination: `/:locale/${to}`,
      permanent: false,
    }));
  },
};

export default withNextIntl(nextConfig);
