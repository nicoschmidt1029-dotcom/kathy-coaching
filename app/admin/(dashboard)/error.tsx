"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("Admin operation failed", error);
  }, [error]);

  return (
    <section role="alert" className="rounded-2xl border border-red-900/15 bg-red-50 p-6 text-red-950">
      <h1 className="font-display text-3xl">Your changes were not saved</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed">Please check your connection and try again. If your login has expired, sign in again and then repeat the change. The website was not updated by this failed request.</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="min-h-11 rounded-xl bg-[var(--plum)] px-5 py-2.5 text-sm text-white">Try again</button>
        <Link href="/admin/login" className="inline-flex min-h-11 items-center rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm">Return to login</Link>
      </div>
    </section>
  );
}
