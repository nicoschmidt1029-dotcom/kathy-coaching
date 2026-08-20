"use client";

export function ConfirmSubmit({ children, message }: { children: React.ReactNode; message: string }) {
  return <button type="submit" onClick={(event) => { if (!window.confirm(message)) event.preventDefault(); }} className="rounded-xl border border-red-900/15 px-4 py-2.5 text-sm text-red-900 hover:bg-red-50">{children}</button>;
}
