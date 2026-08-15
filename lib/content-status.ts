/**
 * Whether the testimonials on this site come from real clients.
 *
 * They do not. Marcus, Hannah, Sophie and Lena — names, ages, programs and
 * quotes — were written as filler while the site was being built, and no
 * before/after photos have ever been shared with anyone.
 *
 * While this is false the testimonial sections carry a visible "sample
 * content" notice, /testimonials is served noindex and stays out of the
 * sitemap. Presenting invented client stories as real on a coaching site is
 * not just a trust problem: Art. 3 lit. b UWG — the same act the imprint
 * cites — covers misleading statements about one's own business.
 *
 * Flip to true only when every quote on the page is from a real person who
 * agreed to it. This one constant is the whole switch.
 *
 * Sibling flags for content that is not finished yet:
 *   - LEGAL_REVIEWED   (components/legal/index.ts)  — legal texts unreviewed
 *   - DRAFT_LOCALES    (i18n/routing.ts)            — Slovak is a draft
 */
export const TESTIMONIALS_ARE_REAL = false;

/**
 * Still pending from Katarina — not gated behind a flag like the constant
 * above, just a checklist so it isn't forgotten. Ask again next session if
 * any of these are still open.
 *
 *   - about.tsx stats: years coaching, people accompanied (removed from the
 *     page on her request rather than shown as "NOCH AUSZUFÜLLEN" — see the
 *     component's own comment)
 *   - about.tsx qualifications: exact certificate designations for the SNF
 *     Academy trainer/nutrition certs, and the Awakening School of Ministry
 *     graduation year
 *   - imprint page: street address, postal code, public email, phone (or
 *     confirmation none will be published) — see components/legal
 *   - legal texts generally: unreviewed, see LEGAL_REVIEWED above
 */
