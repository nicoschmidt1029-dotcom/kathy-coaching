"use client";

import { useEffect, useState } from "react";
import { CircleHelp, PlayCircle, X } from "lucide-react";

const tutorials = [
  {
    title: "Start, save and publish",
    video: "/videos/admin/overview.mp4",
    poster: "/videos/admin/overview-poster.jpg",
    description: "A quick tour of the dashboard and the difference between a draft and published content.",
    steps: ["Choose a content area", "Edit only the fields you need", "Save a draft or publish it"],
  },
  {
    title: "Edit programs",
    video: "/videos/admin/programs.mp4",
    poster: "/videos/admin/programs-poster.jpg",
    description: "Update program copy, price, image and language versions without changing the design.",
    steps: ["Open Programs", "Choose an existing program or add one", "Complete EN, DE and SK, then publish"],
  },
  {
    title: "Create a recipe",
    video: "/videos/admin/recipes.mp4",
    poster: "/videos/admin/recipes-poster.jpg",
    description: "Add a recipe image, timings, ingredients and instructions in all three languages.",
    steps: ["Select Add recipe", "Add the recipe details and image", "Review each language before publishing"],
  },
  {
    title: "Texts, images and media",
    video: "/videos/admin/content-media.mp4",
    poster: "/videos/admin/content-media-poster.jpg",
    description: "Replace selected website text and images, then review uploaded media.",
    steps: ["Open Website Content", "Expand the section you need", "Upload or replace an image and publish"],
  },
];

export function AdminTutorials() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", close);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", close);
      document.body.style.overflow = "";
    };
  }, [open]);

  return <>
    <button type="button" onClick={() => setOpen(true)} className="inline-flex min-h-10 items-center gap-2 rounded-xl px-2 text-sm text-[var(--plum)] hover:bg-black/5 sm:px-3" aria-haspopup="dialog" aria-label="Tutorials öffnen">
      <CircleHelp className="size-4" /><span className="hidden sm:inline">Tutorials</span>
    </button>
    {open && <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/45 p-0 sm:items-center sm:p-5" role="dialog" aria-modal="true" aria-labelledby="tutorial-title" onMouseDown={(event) => event.currentTarget === event.target && setOpen(false)}>
      <section className="max-h-[94dvh] w-full max-w-5xl overflow-y-auto rounded-t-3xl bg-[#f8f5ef] shadow-2xl sm:max-h-[90dvh] sm:rounded-3xl">
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-black/10 bg-[#f8f5ef]/95 px-5 py-5 backdrop-blur sm:px-7">
          <div><p className="eyebrow">Help centre</p><h2 id="tutorial-title" className="mt-1 font-display text-3xl text-[var(--plum)]">How to manage the website</h2><p className="mt-2 max-w-2xl text-sm text-foreground/60">Short, practical walkthroughs. Watching a video does not change any website content.</p></div>
          <button type="button" onClick={() => setOpen(false)} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-sm" aria-label="Close tutorials"><X className="size-5" /></button>
        </header>
        <div className="grid gap-5 p-4 sm:p-7 lg:grid-cols-2">
          {tutorials.map((tutorial) => <article key={tutorial.video} className="overflow-hidden rounded-2xl border border-black/10 bg-[#fbf8f2] shadow-sm">
            <div className="relative bg-[#1b2e3d]"><video controls playsInline preload="metadata" poster={tutorial.poster} className="aspect-video w-full" aria-label={tutorial.title}><source src={tutorial.video} type="video/mp4" />Your browser does not support this tutorial video.</video><PlayCircle aria-hidden className="pointer-events-none absolute left-4 top-4 size-5 text-white/70" /></div>
            <div className="p-5"><h3 className="font-display text-2xl text-[var(--plum)]">{tutorial.title}</h3><p className="mt-2 text-sm leading-relaxed text-foreground/62">{tutorial.description}</p><ol className="mt-4 space-y-2 text-sm text-foreground/72">{tutorial.steps.map((step, index) => <li key={step} className="flex gap-3"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--sand)] text-[0.7rem] font-medium text-[var(--plum)]">{index + 1}</span><span>{step}</span></li>)}</ol></div>
          </article>)}
        </div>
      </section>
    </div>}
  </>;
}
