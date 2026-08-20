import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { FaqContentForm } from "@/components/admin/faq-content-form";
import { getCmsEntries } from "@/lib/cms";
import en from "@/messages/en.json";
import de from "@/messages/de.json";
import sk from "@/messages/sk.json";

const messages = { en, de, sk };

export default async function WebsiteContentPage() {
  const entries = await getCmsEntries("website");
  const entry = (key: string) => entries.find((item) => item.content_key === key);
  const localized = (pick: (message: typeof en) => string) => Object.fromEntries(Object.entries(messages).map(([locale, message]) => [locale, pick(message as typeof en)]));
  const faqKeys = ["believer", "women", "how", "gym", "beginner"] as const;
  const faqDefaults = {
    headline: localized((m) => m.faq.title),
    body: localized((m) => m.faq.intro),
    items: Object.fromEntries(Object.entries(messages).map(([locale, message]) => [locale, faqKeys.map((key) => ({ question: message.faq[key].q, answer: message.faq[key].a }))])),
  };
  return <><p className="eyebrow">Selected content</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Website Content</h1><p className="mt-3 max-w-xl text-sm text-foreground/55">Only useful content fields are editable. Layout, typography, navigation and legal pages remain protected.</p><div className="mt-7 space-y-5"><WebsiteContentForm contentKey="about" title="About Katey" entry={entry("about")} defaults={{ headline: localized((m) => m.about.overlapTitle), body: { en: "", de: "", sk: "" } }} /><WebsiteContentForm contentKey="mission" title="My Mission" entry={entry("mission")} defaults={{ headline: localized((m) => m.mission.title), body: localized((m) => m.mission.p3) }} /><WebsiteContentForm contentKey="contact" title="Contact" entry={entry("contact")} defaults={{ headline: localized((m) => m.contact.title), body: { en: "", de: "", sk: "" } }} /><FaqContentForm entry={entry("faq")} defaults={faqDefaults} /></div></>;
}
