/**
 * Canonical site origin, resolved from the environment — no hardcoded domain.
 *
 * Priority:
 *   1. NEXT_PUBLIC_SITE_URL          (set this in Vercel → Settings → Env Vars)
 *   2. VERCEL_PROJECT_PRODUCTION_URL (Vercel's automatic production domain)
 *   3. http://localhost:3000         (local dev fallback)
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/+$/, "");

/** Hostname only (e.g. for display), derived from SITE_URL. */
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");
