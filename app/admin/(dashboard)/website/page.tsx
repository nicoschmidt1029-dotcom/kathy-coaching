import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { getCmsEntries } from "@/lib/cms";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";

const messages = { en, de, sk };

export default async function WebsiteContentPage({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const saved = (await searchParams).saved === "1";
  const entries = await getCmsEntries("website");
  const entry = (key: string) => entries.find((item) => item.content_key === key);
  const localized = (pick: (message: typeof en) => string) => Object.fromEntries(Object.entries(messages).map(([locale, message]) => [locale, pick(message as typeof en)]));
  return <>{saved && <div role="status" className="mb-6 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-900">Changes saved successfully.</div>}<p className="eyebrow">Website content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Website Content</h1><p className="mt-3 max-w-xl text-sm text-foreground/55">Edit useful content safely. Design, navigation, video settings and technical configuration remain protected.</p><div className="mt-7 space-y-5"><WebsiteContentForm contentKey="homepage" title="Homepage hero" description="Change the hero words and button. The background video stays protected." entry={entry("homepage")} defaults={{ headline: localized((m) => m.hero.headline.replace(/<\/?em>/g, "")), body: localized((m) => m.hero.body), ctaLabel: localized((m) => m.hero.cta), ctaHref: "/programme" }} showCta /><WebsiteContentForm contentKey="about" title="About page" description="Update Katarina's biography and main portrait." entry={entry("about")} defaults={{ eyebrow: localized((m) => m.about.eyebrow), headline: localized((m) => m.about.overlapTitle), body: { en: "", de: "", sk: "" } }} imageHint="Recommended: portrait image, at least 1200 px high." /><WebsiteContentForm contentKey="mission" title="My Mission" description="Update the mission wording without changing its approved design." entry={entry("mission")} defaults={{ eyebrow: localized((m) => m.mission.eyebrow), headline: localized((m) => m.mission.title), body: localized((m) => m.mission.p3) }} imageHint="Recommended: portrait image, at least 1200 px high." /><WebsiteContentForm contentKey="contact" title="Contact page" description="Change the heading, short introduction, button label and main image. The secure contact form remains protected." entry={entry("contact")} defaults={{ eyebrow: localized((m) => m.contact.eyebrow), headline: localized((m) => m.contact.title), body: { en: "", de: "", sk: "" }, submitLabel: localized((m) => m.contact.submit) }} showSubmitLabel imageHint="Recommended: portrait image, at least 1200 px high." /></div></>;
}
