export function AdminPageHeading({ eyebrow = "Website page", title, description }: { eyebrow?: string; title: string; description: string }) {
  return <div className="mb-7"><p className="eyebrow">{eyebrow}</p><h1 className="mt-2 font-display text-4xl text-[var(--plum)]">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/55">{description}</p></div>;
}
