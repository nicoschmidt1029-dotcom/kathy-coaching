"use client";

import { useState } from "react";
import { Clapperboard } from "lucide-react";
import type { AdminTutorial } from "@/lib/admin-tutorials";

export function TutorialCard({ tutorial }: { tutorial: AdminTutorial }) {
  const [missing, setMissing] = useState(false);
  return <article id={tutorial.id} className="overflow-hidden rounded-2xl border border-black/10 bg-[#fbf8f2] shadow-sm">{missing ? <div className="flex aspect-video flex-col items-center justify-center bg-[#1b2e3d] px-6 text-center text-white"><Clapperboard className="size-8 text-white/70" /><p className="mt-3 font-medium">Video recording coming soon</p><p className="mt-1 text-xs text-white/65">The written steps below are ready to use now.</p></div> : <video controls playsInline preload="metadata" poster={tutorial.thumbnail} className="aspect-video w-full bg-[#1b2e3d]" aria-label={tutorial.title} onError={() => setMissing(true)}><source src={tutorial.videoSrc} type="video/mp4" /></video>}<div className="p-5"><div className="flex flex-wrap items-center gap-2 text-xs text-foreground/50"><span>{tutorial.category}</span><span>·</span><span>{tutorial.duration}</span></div><h3 className="mt-2 font-display text-2xl text-[var(--plum)]">{tutorial.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/62">{tutorial.description}</p><ol className="mt-4 space-y-2 text-sm text-foreground/72">{tutorial.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--sand)] text-xs">{index + 1}</span>{step}</li>)}</ol><p className="mt-4 break-all text-xs text-foreground/40">Future video: {tutorial.videoSrc}</p></div></article>;
}
