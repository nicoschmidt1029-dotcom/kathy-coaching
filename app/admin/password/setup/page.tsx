import { confirmPasswordSetup } from "@/app/admin/actions";

export default async function PasswordSetupConfirmation({ searchParams }: { searchParams: Promise<{ token_hash?: string }> }) {
  const { token_hash: tokenHash } = await searchParams;
  return <main className="flex min-h-screen items-center justify-center bg-[#f5f0e8] px-4 py-12"><section className="w-full max-w-md rounded-3xl border border-black/10 bg-[#fbf8f2] p-7 shadow-sm sm:p-10"><p className="eyebrow">Katey Coaching</p><h1 className="mt-3 font-display text-4xl text-[var(--plum)]">Passwort einrichten</h1><p className="mt-4 text-sm leading-relaxed text-foreground/65">Bestätige den sicheren Link, um anschließend dein persönliches Admin-Passwort festzulegen.</p><form action={confirmPasswordSetup} className="mt-6"><input type="hidden" name="token_hash" value={tokenHash ?? ""} /><button className="min-h-12 w-full rounded-xl bg-[var(--plum)] px-4 py-3 text-sm font-medium text-white">Weiter und Passwort wählen</button></form></section></main>;
}
