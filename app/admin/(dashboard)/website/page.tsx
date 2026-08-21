import { redirect } from "next/navigation";

export default function WebsiteContentRedirect() {
  redirect("/admin/homepage");
}
