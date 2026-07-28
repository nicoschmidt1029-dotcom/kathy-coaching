import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** When true, renders in cream on dark backgrounds (hero, plum bands) */
  onDark?: boolean;
};

export function Wordmark({ className, onDark = false }: Props) {
  return (
    <Link
      href="/"
      aria-label="Kathy Coaching — home"
      className={cn(
        "group inline-flex items-center gap-2.5 leading-none",
        className
      )}
    >
      {/* Custom mark: soft brushstroke arc that echoes the hero underline motif */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-7 shrink-0 transition-transform duration-300 ease-out group-hover:rotate-[-4deg]"
      >
        <path
          d="M4 15 C 6 6, 14 5, 20 9"
          fill="none"
          stroke={onDark ? "var(--clay)" : "var(--plum)"}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <circle
          cx="20"
          cy="9"
          r="1.6"
          fill={onDark ? "var(--clay)" : "var(--plum)"}
        />
      </svg>

      <span
        className={cn(
          "flex flex-col leading-none",
          onDark ? "text-[var(--primary-foreground)]" : "text-foreground"
        )}
      >
        <span className="font-display text-lg tracking-tight md:text-xl">
          <span className="italic">K</span>athy
        </span>
        <span
          className={cn(
            "mt-1 font-mono text-[0.6rem] tracking-[0.28em] uppercase leading-none",
            onDark
              ? "text-[var(--primary-foreground)]/65"
              : "text-[var(--plum)]/70"
          )}
        >
          Coaching
        </span>
      </span>
    </Link>
  );
}
