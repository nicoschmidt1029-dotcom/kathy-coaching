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
    { key: "featured", label: "Featured recipe label" },
    { key: "exploreEyebrow", label: "Recipe list small heading" },
    { key: "exploreTitle", label: "Recipe list heading" },
  ],
  footer: [
    { key: "claim", label: "Personal footer statement", multiline: true },
  ],
};
