/* ==========================================================================
 * LEGAL CONTENT - NOT YET VERIFIED BY A LAWYER OR SWISS LEGAL EXPERT -
 * review before this page is considered final
 * --------------------------------------------------------------------------
 * Every document reachable from this file carries the same warning at its
 * own head. It is separate from the <Todo> placeholders: those mark facts
 * Katie still has to supply, this marks the surrounding text — legal bases,
 * article citations, liability wording, completeness — as unreviewed.
 *
 * Two sign-offs are outstanding before Katarína can rely on these pages:
 *   1. a Swiss lawyer or legal expert on the content of all three versions;
 *   2. a native speaker on the Slovak translation.
 * ========================================================================== */

import type { Locale } from "@/i18n/routing";
import { ImprintBodyEn } from "./imprint/en";
import { ImprintBodyDe } from "./imprint/de";
import { ImprintBodySk } from "./imprint/sk";
import { PrivacyBodyEn } from "./privacy/en";
import { PrivacyBodyDe } from "./privacy/de";
import { PrivacyBodySk } from "./privacy/sk";

/**
 * Whether the legal review has happened.
 *
 * While this is false, /imprint and /privacy are served `noindex` in every
 * language and kept out of the sitemap: an incomplete, lawyer-unreviewed
 * legal notice should not be the version search engines carry, and an indexed
 * copy outlives the page it was taken from.
 *
 * Flip to true once a Swiss legal expert has signed off — the pages return to
 * `index: true` and to the sitemap. This one constant is the whole switch.
 */
export const LEGAL_REVIEWED = false;

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
