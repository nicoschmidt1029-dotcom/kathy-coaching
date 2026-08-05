import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware replacements for next/link and the navigation hooks.
 *
 * Import `Link` from here instead of "next/link" anywhere inside the site —
 * hrefs are written without a locale ("/about") and the current locale is
 * prefixed automatically ("/de/about").
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
