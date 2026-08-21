import { EditorialSectionForm } from "@/components/admin/editorial-section-form";
import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { getCmsEntries } from "@/lib/cms";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";

const messages = { en, de, sk };
const localized = (pick: (message: typeof en) => string) => Object.fromEntries(Object.entries(messages).map(([locale, message]) => [locale, pick(message as typeof en)]));

export default async function WebsiteContentPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const saved = (await searchParams).saved === "1";
  const entries = await getCmsEntries("website");
  const entry = (key: string) => entries.find((item) => item.content_key === key);

  return <>{saved && <div role="status" className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Changes saved successfully.</div>}<p className="eyebrow">Website content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Website Content</h1><p className="mt-3 max-w-xl text-sm text-foreground/55">Edit public wording and images safely. Layout, navigation behaviour and technical settings remain protected.</p><div className="mt-7 space-y-5">
    <WebsiteContentForm contentKey="homepage" title="Homepage hero" description="Change every visible word in the homepage hero. The background video stays protected." entry={entry("homepage")} defaults={{ headline: localized((m) => m.hero.headline.replace(/<\/?em>/g, "")), body: localized((m) => m.hero.body), ctaLabel: localized((m) => m.hero.cta), ctaHref: "/programme" }} showCta />
    <WebsiteContentForm contentKey="about" title="About Katey — main section" description="Update the page heading, biography and main portrait." entry={entry("about")} defaults={{ eyebrow: localized((m) => m.about.eyebrow), headline: localized((m) => m.about.overlapTitle), body: { en: "", de: "", sk: "" } }} imageHint="Recommended: portrait image, at least 1200 px high." />
    <EditorialSectionForm contentKey="about-details" title="About Katey — personal opening" description="Change the short personal statement beside the main About portrait." entry={entry("about-details")} preview="/en/katey" defaults={{ calling: localized((m) => m.about.calling.replace(/<\/?em>/g, "")) }} />
    <WebsiteContentForm contentKey="mission" title="My Mission" description="Update every visible Mission word and its photograph without changing the approved layout." entry={entry("mission")} defaults={{ eyebrow: localized((m) => m.mission.eyebrow), headline: localized((m) => m.mission.title), body: localized((m) => m.mission.p3) }} imageHint="Recommended: portrait image, at least 1200 px high." />
    <EditorialSectionForm contentKey="recipes-page" title="Recipes page introduction" description="Edit the public Recipes headings, introductory paragraphs and featured label. Individual recipes are managed under Recipes." entry={entry("recipes-page")} preview="/en/recipes" defaults={{
      eyebrow: localized((m) => m.recipes.eyebrow),
      title: localized((m) => m.recipes.title),
      intro: localized((m) => m.recipes.intro),
      featured: localized((m) => m.recipes.featured),
      exploreEyebrow: localized((m) => m.recipes.exploreEyebrow),
      exploreTitle: localized((m) => m.recipes.exploreTitle),
    }} />
    <EditorialSectionForm contentKey="footer" title="Footer statement" description="Edit Katarina's short personal sentence shown beside the footer logo. Legal links and copyright information stay protected." entry={entry("footer")} preview="/en" defaults={{ claim: localized((m) => m.footer.claim) }} />
    <WebsiteContentForm contentKey="contact" title="Contact page" description="Change every optional Contact-page word and the main photograph. The secure Name, Email and Message form stays protected." entry={entry("contact")} defaults={{ eyebrow: localized((m) => m.contact.eyebrow), headline: localized((m) => m.contact.title), body: { en: "", de: "", sk: "" }, submitLabel: localized((m) => m.contact.submit) }} showSubmitLabel imageHint="Recommended: portrait image, at least 1200 px high." />
  </div></>;
}
