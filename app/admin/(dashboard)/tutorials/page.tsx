import { TutorialCard } from "@/components/admin/tutorial-card";
import { ADMIN_TUTORIALS } from "@/lib/admin-tutorials";

export default function TutorialsPage() {
  return <><p className="eyebrow">Help centre</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Simple instructions</h1><p className="mt-3 max-w-2xl text-sm text-foreground/60">Choose what you want to do and follow the short steps. No technical knowledge is needed.</p><div className="mt-7 grid gap-5 lg:grid-cols-2">{ADMIN_TUTORIALS.map((tutorial) => <TutorialCard key={tutorial.id} tutorial={tutorial} />)}</div></>;
}
