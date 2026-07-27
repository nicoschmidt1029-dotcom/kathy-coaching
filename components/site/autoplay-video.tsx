"use client";

import * as React from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  poster?: string;
  ariaLabel: string;
  className?: string;
  /** Tailwind aspect class, e.g. "aspect-video", "aspect-square", "aspect-[4/5]" */
  aspect?: string;
};

/**
 * Small, focused inline video: autoplay muted loop, click-to-unmute pill.
 * Falls back to a play-to-start button if the browser blocks the initial
 * autoplay (e.g. Safari with low-power mode).
 */
export function AutoplayVideo({
  src,
  poster,
  ariaLabel,
  className,
  aspect = "aspect-video",
}: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const [needsGesture, setNeedsGesture] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play()
      .then(() => setNeedsGesture(false))
      .catch(() => setNeedsGesture(true));
  }, [src]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  };

  const startFromGesture = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    setMuted(false);
    el.play()
      .then(() => setNeedsGesture(false))
      .catch(() => {});
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-foreground/[0.06] ring-1 ring-foreground/10",
        aspect,
        className
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        aria-label={ariaLabel}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="metadata"
      />

      {needsGesture ? (
        <button
          type="button"
          onClick={startFromGesture}
          className="absolute inset-0 flex items-center justify-center bg-black/15 transition-colors duration-200 hover:bg-black/25"
          aria-label={`Play ${ariaLabel} with sound`}
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-white/95 text-[var(--sage-deep)] shadow-md ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
            <Play className="ml-0.5 size-4" aria-hidden />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <VolumeX className="size-3" aria-hidden />
          ) : (
            <Volume2 className="size-3" aria-hidden />
          )}
          <span>{muted ? "Sound" : "Muted"}</span>
        </button>
      )}
    </div>
  );
}
