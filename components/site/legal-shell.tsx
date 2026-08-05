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
          <h1 className="section-title">{title}</h1>
          <p className="caption mt-4">Last updated · {updated}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="prose-legal md:col-span-8">{children}</div>
        </div>
      </div>
    </article>
  );
}

// Lives in ./todo now — re-exported so the legal pages keep their import.
export { Todo } from "./todo";
