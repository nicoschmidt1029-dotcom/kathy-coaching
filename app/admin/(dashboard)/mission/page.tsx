import { AdminPageHeading } from "@/components/admin/page-heading";
import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function MissionAdmin() {
  const entry = (await getCmsEntries("website")).find((item) => item.content_key === "mission");
  return <><AdminPageHeading title="My Mission" description="Change the Mission wording and photograph without changing its approved design." /><WebsiteContentForm contentKey="mission" title="Mission content" description="The first paragraph is the statement beside the image. Paragraphs after a blank line appear below the hero." entry={entry} defaults={{ eyebrow: localized((m) => m.mission.eyebrow), headline: localized((m) => m.mission.title), body: localized((m) => `${m.mission.p3}\n\n${m.mission.body}`) }} imageHint="Recommended: portrait image, at least 1200 px high." /></>;
}
