import { cn } from "@/lib/utils";

export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("section-pad", className)}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] font-normal text-balance">
            {title}
          </h1>
          <p className="caption mt-4">Last updated · {updated}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="prose-legal md:col-span-8">{children}</div>
        </div>
      </div>
    </article>
  );
}

export function Todo({ children }: { children: React.ReactNode }) {
  return (
    <span className="mx-0.5 inline rounded bg-[oklch(0.94_0.06_78)] px-1.5 py-0.5 font-mono text-[0.72em] tracking-wide text-[oklch(0.35_0.09_50)] ring-1 ring-[oklch(0.75_0.09_60)]">
      TODO · {children}
    </span>
  );
}
