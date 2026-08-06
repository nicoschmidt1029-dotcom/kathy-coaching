import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

/**
 * Locale negotiation, plus the request path forwarded as a header.
 *
 * app/not-found.tsx renders outside the [locale] layout and so has no
 * `params` to read the locale from, and Next exposes no supported way for a
 * page to ask for the requested path. Passing it here is what lets an unknown
 * URL still come back in the right language.
 */
export default function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);
  response.headers.set("x-pathname", request.nextUrl.pathname);
  return response;
}

export const config = {
  /**
   * Run on everything except API routes, Next internals, and files with an
   * extension (images, videos, favicon, …). Unknown paths still pass through
   * so they get a locale prefix and land on the localized 404.
   */
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
