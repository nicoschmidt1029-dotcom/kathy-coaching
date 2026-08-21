"use client";

import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

export function GuardedForm({ action, children, className }: { action: (data: FormData) => void | Promise<void>; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) event.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  return <form ref={ref} action={action} className={className} onChange={() => setDirty(true)} onSubmit={() => setDirty(false)}>{children}</form>;
}

export function SaveButton({ children, value, variant = "primary" }: { children: React.ReactNode; value: string; variant?: "primary" | "secondary" }) {
  const { pending } = useFormStatus();
  const className = variant === "primary"
    ? "min-h-11 rounded-xl bg-[var(--plum)] px-5 py-2.5 text-sm text-white disabled:opacity-60"
    : "min-h-11 rounded-xl border border-black/10 bg-white px-5 py-2.5 text-sm disabled:opacity-60";
  return <button name="status" value={value} disabled={pending} className={className}>{pending ? "Saving…" : children}</button>;
}

export function SavedNotice({ show, message = "Changes saved successfully." }: { show: boolean; message?: string }) {
  return show ? <div role="status" className="mb-6 rounded-xl border border-emerald-800/15 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{message}</div> : null;
}
