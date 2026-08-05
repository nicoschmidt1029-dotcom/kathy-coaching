import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Per-request message loading.
 *
 * English is merged in underneath the requested locale, so any key missing
 * from de.json or sk.json falls back to the English original instead of
 * rendering a raw key. That is what lets us ship /de and /sk today with only
 * some sections translated.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const en = (await import("../messages/en.json")).default;
  const messages =
    locale === "en"
      ? en
      : deepMerge(en, (await import(`../messages/${locale}.json`)).default);

  return { locale, messages };
});

type Messages = { [key: string]: string | Messages };

/** Overlay `override` on top of `base`, recursing into nested namespaces. */
function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    out[key] =
      typeof value === "object" &&
      value !== null &&
      typeof current === "object" &&
      current !== null
        ? deepMerge(current, value)
        : value;
  }
  return out;
}
