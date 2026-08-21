import { AdminPageHeading } from "@/components/admin/page-heading";
import { WebsiteContentForm } from "@/components/admin/website-content-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function ContactAdmin() {
  const entry = (await getCmsEntries("website")).find((item) => item.content_key === "contact");
  return <><AdminPageHeading title="Contact" description="Edit the Contact-page wording and main photograph. The secure form remains protected." /><WebsiteContentForm contentKey="contact" title="Contact page content" description="The public form stays as Name, Email and Message." entry={entry} defaults={{ eyebrow: localized((m) => m.contact.eyebrow), headline: localized((m) => m.contact.title), body: { en: "", de: "", sk: "" }, submitLabel: localized((m) => m.contact.submit) }} showSubmitLabel imageHint="Recommended: portrait image, at least 1200 px high." /></>;
}
