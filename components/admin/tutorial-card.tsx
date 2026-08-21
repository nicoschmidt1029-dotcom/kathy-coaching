import { BookOpenCheck } from "lucide-react";
import type { AdminTutorial } from "@/lib/admin-tutorials";

export function TutorialCard({ tutorial }: { tutorial: AdminTutorial }) {
  return <article id={tutorial.id} className="scroll-mt-24 rounded-2xl border border-black/10 bg-[#fbf8f2] p-5 shadow-sm sm:p-6"><div className="flex items-center gap-2 text-xs text-foreground/50"><BookOpenCheck className="size-4 text-[var(--clay)]" /><span>{tutorial.category}</span></div><h2 className="mt-3 font-display text-2xl text-[var(--plum)]">{tutorial.title}</h2><p className="mt-2 text-sm leading-relaxed text-foreground/65">{tutorial.description}</p><ol className="mt-5 space-y-3 text-sm text-foreground/75">{tutorial.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--sand)] text-xs font-medium text-[var(--plum)]">{index + 1}</span><span className="pt-0.5 leading-relaxed">{step}</span></li>)}</ol><p className="mt-5 border-t border-black/8 pt-4 text-sm leading-relaxed text-foreground/60"><span className="font-medium text-[var(--plum)]">What happens:</span> {tutorial.result}</p></article>;
}
