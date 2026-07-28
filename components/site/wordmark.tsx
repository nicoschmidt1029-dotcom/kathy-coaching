import Link from "next/link";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Katarina — home"
      className={cn(
        "group inline-flex items-baseline gap-1 font-display text-xl leading-none tracking-tight text-foreground",
        className
      )}
    >
      <span className="italic">K</span>
      <span className="-ml-[0.05em]">atarina</span>
      <span
        aria-hidden
        className="ml-1 h-1.5 w-1.5 rounded-full bg-[var(--clay)] transition-transform duration-300 ease-out group-hover:scale-110"
      />
    </Link>
  );
}
