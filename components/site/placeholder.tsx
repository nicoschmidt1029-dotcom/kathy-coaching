import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  aspect?: "portrait" | "square" | "landscape" | "wide" | "auto";
  tone?: "sand" | "sage" | "cream";
};

const aspectMap: Record<NonNullable<Props["aspect"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  auto: "",
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  sand: "bg-[oklch(0.92_0.022_78)]",
  sage: "bg-[oklch(0.88_0.03_145)]",
  cream: "bg-[oklch(0.96_0.012_82)]",
};

export function Placeholder({
  label,
  className,
  aspect = "portrait",
  tone = "sand",
}: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10",
        aspectMap[aspect],
        toneMap[tone],
        className
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
          color: "var(--foreground)",
        }}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-foreground/55">
        <ImageIcon className="size-6" aria-hidden />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          {label}
        </span>
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground/40">
          placeholder · replace later
        </span>
      </div>
    </div>
  );
}
