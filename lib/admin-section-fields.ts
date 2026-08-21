export type EditorialSectionKey = "about-details" | "recipes-page" | "footer";
export type EditorialField = { key: string; label: string; multiline?: boolean };

export const EDITORIAL_SECTION_FIELDS: Record<EditorialSectionKey, readonly EditorialField[]> = {
  "about-details": [
    { key: "calling", label: "Personal opening statement", multiline: true },
  ],
  "recipes-page": [
    { key: "eyebrow", label: "Small heading" },
    { key: "title", label: "Main heading" },
    { key: "intro", label: "Introduction", multiline: true },
    { key: "introSecondary", label: "Additional introduction", multiline: true },
    { key: "featured", label: "Featured recipe label" },
    { key: "exploreEyebrow", label: "Recipe list small heading" },
    { key: "exploreTitle", label: "Recipe list heading" },
    { key: "quote", label: "Page quote", multiline: true },
    { key: "wellnessEyebrow", label: "Coaching section small heading" },
    { key: "wellnessTitle", label: "Coaching section heading" },
    { key: "wellnessBody", label: "Coaching section text", multiline: true },
    { key: "wellnessCta", label: "Coaching button label" },
  ],
  footer: [
    { key: "claim", label: "Personal footer statement", multiline: true },
  ],
};
