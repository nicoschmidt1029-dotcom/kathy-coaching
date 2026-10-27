import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Per-request message loading.
 *
 * Each locale is loaded independently. This deliberately avoids leaking
 * English fallback copy into the German or Slovak visitor experience.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const messages = (await import(`../messages/${locale}.json`)).default;
  return { locale, messages: stripNotes(messages) };
});

type Messages = { [key: string]: string | Messages };

/**
 * Drop the underscore-prefixed keys before the messages leave the server.
 *
 * The message files carry notes for whoever edits them next — `_status` in
 * de.json and sk.json, `_comment` on individual namespaces. NextIntlClientProvider
 * hands the whole message object to the browser, so without this every visitor
 * downloads them, and "DRAFT — NEEDS NATIVE SPEAKER REVIEW" sits in the page
 * source of a live site. Harmless, but it is documentation for us, not payload
 * for them.
 */
function stripNotes(messages: Messages): Messages {
  const out: Messages = {};
  for (const [key, value] of Object.entries(messages)) {
    if (key.startsWith("_")) continue;
    out[key] =
      typeof value === "object" && value !== null ? stripNotes(value) : value;
  }
  return out;
}
