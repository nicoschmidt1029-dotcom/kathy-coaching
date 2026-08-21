import { AdminPageHeading } from "@/components/admin/page-heading";
import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function HomepageAdmin() {
  const entry = (await getCmsEntries("website")).find((item) => item.content_key === "homepage");
  return <><AdminPageHeading title="Homepage" description="Change the homepage headline, supporting text and button. The background video and layout stay protected." /><WebsiteContentForm contentKey="homepage" title="Homepage hero" description="These are all editable words currently visible on the homepage." entry={entry} defaults={{ headline: localized((m) => m.hero.headline.replace(/<\/?em>/g, "")), body: localized((m) => m.hero.body), ctaLabel: localized((m) => m.hero.cta), ctaHref: "/programme" }} showCta /></>;
}
