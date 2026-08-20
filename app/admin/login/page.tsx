import { redirect } from "next/navigation";
import Link from "next/link";
import { Mail } from "lucide-react";
import { requestMagicLink } from "@/app/admin/actions";
import { getAdminUser } from "@/lib/admin-auth";

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ sent?: string; error?: string }> }) {
  if (await getAdminUser()) redirect("/admin");
  const query = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-4 py-12">
    <section className="w-full max-w-md rounded-3xl border border-black/10 bg-[#fbf8f2] p-7 shadow-sm sm:p-10">
      <p className="eyebrow">Katey Coaching</p>
      <h1 className="mt-3 font-display text-4xl text-[var(--plum)]">Admin login</h1>
      <p className="mt-4 text-sm leading-relaxed text-foreground/65">Gib deine freigegebene E-Mail-Adresse ein. Du erhältst einen sicheren, einmalig verwendbaren Login-Link.</p>
      {query.sent && <p className="mt-5 rounded-xl bg-emerald-900/8 p-3 text-sm text-emerald-900">Login-Link gesendet. Bitte prüfe dein Postfach.</p>}
      {query.error === "expired" && <p className="mt-5 rounded-xl bg-red-900/8 p-3 text-sm text-red-900">Der Login-Link ist abgelaufen oder wurde bereits verwendet. Bitte fordere einen neuen Link an und öffne nur die neueste E-Mail.</p>}
      {query.error && query.error !== "expired" && <p className="mt-5 rounded-xl bg-red-900/8 p-3 text-sm text-red-900">Anmeldung nicht möglich. Bitte prüfe die freigegebene E-Mail-Adresse.</p>}
      <form action={requestMagicLink} className="mt-6 space-y-4">
        <label className="block text-sm font-medium text-foreground/75">E-Mail<input name="email" type="email" required autoComplete="email" className="mt-1.5 w-full rounded-xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-[var(--clay)] focus:ring-2 focus:ring-[var(--clay)]/15" /></label>
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--plum)] px-4 py-3 text-sm font-medium text-white hover:bg-[var(--plum)]/90"><Mail className="size-4" />Secure login link</button>
      </form>
      <Link href="/en" className="mt-6 block text-center text-xs text-foreground/50 hover:text-foreground">Back to website</Link>
    </section>
  </main>;
}
