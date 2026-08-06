import type { Locale } from "@/i18n/routing";
import { ImprintBodyEn } from "./imprint/en";
import { ImprintBodyDe } from "./imprint/de";
import { ImprintBodySk } from "./imprint/sk";
import { PrivacyBodyEn } from "./privacy/en";
import { PrivacyBodyDe } from "./privacy/de";
import { PrivacyBodySk } from "./privacy/sk";

/**
 * Legal documents, one component per locale.
 *
 * These are not UI strings and deliberately do not live in messages/*.json: a
 * legal notice is a document that has to be read, reviewed and signed off as
 * a whole. Splitting it into a hundred keys would make it unreviewable, and
 * an accidental fallback to another language mid-document would be worse than
 * a missing button label.
 *
 * The Swiss basis is identical in all three (Art. 3 lit. s UWG for the
 * imprint, nDSG plus GDPR for the privacy notice) — only the prose around the
 * citations is translated, and no version invents data Katie has not given.
 */
export const IMPRINT_BODIES: Record<Locale, () => React.ReactNode> = {
  en: ImprintBodyEn,
  de: ImprintBodyDe,
  sk: ImprintBodySk,
};

export const PRIVACY_BODIES: Record<Locale, () => React.ReactNode> = {
  en: PrivacyBodyEn,
  de: PrivacyBodyDe,
  sk: PrivacyBodySk,
};
