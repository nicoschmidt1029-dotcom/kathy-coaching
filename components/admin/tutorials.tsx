import Link from "next/link";
import { CircleHelp } from "lucide-react";

export function AdminTutorials() {
  return <Link href="/admin/tutorials" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm text-[var(--plum)] hover:bg-black/5" aria-label="Open tutorials"><CircleHelp className="size-4" /><span className="hidden sm:inline">Help & Tutorials</span></Link>;
}
