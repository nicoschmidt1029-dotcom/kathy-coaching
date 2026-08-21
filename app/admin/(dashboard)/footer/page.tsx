import { AdminPageHeading } from "@/components/admin/page-heading";
import { EditorialSectionForm } from "@/components/admin/editorial-section-form";
import { getCmsEntries } from "@/lib/cms";
import { localized } from "@/lib/admin-website-defaults";

export default async function FooterAdmin() {
  const entry = (await getCmsEntries("website")).find((item) => item.content_key === "footer");
  return <><AdminPageHeading title="Footer" description="Edit Katarina's short personal statement beside the footer logo." /><EditorialSectionForm contentKey="footer" title="Footer statement" description="Legal links and copyright information stay protected." entry={entry} previewEnabled={false} defaults={{ claim: localized((m) => m.footer.claim) }} /></>;
}
