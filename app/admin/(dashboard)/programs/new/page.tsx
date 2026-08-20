import { ProgramForm } from "@/components/admin/program-form";

export default function NewProgram() {
  return <><p className="eyebrow">Programs</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">Add program</h1><p className="mt-3 text-sm text-foreground/55">Add all three language versions, then save a draft or publish.</p><div className="mt-7"><ProgramForm defaults={{}} /></div></>;
}
