import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  className?: string;
  aspect?: "portrait" | "square" | "landscape" | "wide" | "auto";
  tone?: "sand" | "clay" | "cream";
  /** Optional temp image URL. When present, renders an <img> and a visible TEMP pill. */
  src?: string;
  alt?: string;
  credit?: string;
};

const aspectMap: Record<NonNullable<Props["aspect"]>, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  wide: "aspect-[16/10]",
  auto: "",
};

const toneMap: Record<NonNullable<Props["tone"]>, string> = {
  sand: "bg-[oklch(0.91_0.007_75)]",
  clay: "bg-[oklch(0.88_0.014_76)]",
  cream: "bg-[oklch(0.96_0.008_78)]",
};

export function Placeholder({
  label,
  className,
  aspect = "portrait",
  tone = "sand",
  src,
  alt,
  credit,
}: Props) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl ring-1 ring-foreground/10",
        aspectMap[aspect],
        !src && toneMap[tone],
        className
      )}
    >
      {src ? (
        <>
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {credit && <TempPill credit={credit} slot={label} />}
        </>
      ) : (
        <>
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
              placeholder · add real photo
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export function TempPill({
  credit,
  slot,
}: {
  credit?: string;
  slot?: string;
}) {
  return (
    <div className="pointer-events-none absolute right-2 bottom-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
      <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
        TEMP
      </span>
      <span className="truncate">
        {slot ? `${slot} · ` : ""}
        {credit ? `${credit}` : "replace before launch"}
      </span>
    </div>
  );
}
