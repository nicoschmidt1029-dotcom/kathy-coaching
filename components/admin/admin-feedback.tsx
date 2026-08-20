"use client";

import { useSearchParams } from "next/navigation";

export function AdminFeedback() {
  const params = useSearchParams();
  const message = params.get("saved") ? "Changes saved successfully." : params.get("deleted") ? "Item deleted." : null;
  return message ? <div role="status" className="mb-6 rounded-xl border border-emerald-800/15 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">{message}</div> : null;
}
