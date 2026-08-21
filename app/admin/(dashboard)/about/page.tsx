import { AdminPageHeading } from "@/components/admin/page-heading";
import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { EditorialSectionForm } from "@/components/admin/editorial-section-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function AboutAdmin() {
  const entries = await getCmsEntries("website");
  const entry = (key: string) => entries.find((item) => item.content_key === key);
  return <><AdminPageHeading title="About Katey" description="Update Katarina's biography, personal opening and main portrait in one place." /><div className="space-y-5"><WebsiteContentForm contentKey="about" title="Main About content" description="Edit the heading, biography and portrait." entry={entry("about")} defaults={{ eyebrow: localized((m) => m.about.eyebrow), headline: localized((m) => m.about.overlapTitle), body: { en: "", de: "", sk: "" } }} imageHint="Recommended: portrait image, at least 1200 px high." /><EditorialSectionForm contentKey="about-details" title="Personal opening" description="Edit the short personal statement shown beside the portrait." entry={entry("about-details")} preview="/en/katey" defaults={{ calling: localized((m) => m.about.calling.replace(/<\/?em>/g, "")) }} /></div></>;
}
