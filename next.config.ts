import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // No remotePatterns: every image on the site is now served from /public.
  // The Unsplash allowance existed only for two stock shots in the approach
  // section, which commissioned illustrations replaced.
  images: {},
};

export default withNextIntl(nextConfig);
