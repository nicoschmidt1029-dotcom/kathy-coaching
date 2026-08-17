"use client";

import * as React from "react";
import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  poster?: string;
  posterCredit?: string;
  /** When set alongside `src`, overlays a TEMP pill on the playing video */
  videoCredit?: string;
  className?: string;
  ariaLabel?: string;
};

export function HeroVideo({
  src,
  poster,
  posterCredit,
  videoCredit,
  className,
  ariaLabel = "Introduction video from Katey",
}: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const [playing, setPlaying] = React.useState(false);
  const [needsGesture, setNeedsGesture] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;
    el.muted = true;
    el.play()
      .then(() => setPlaying(true))
      .catch(() => setNeedsGesture(true));
  }, [src]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) {
      el.play()
        .then(() => {
          setPlaying(true);
          setNeedsGesture(false);
        })
        .catch(() => {});
    }
  };

  const startFromGesture = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = false;
    setMuted(false);
    el.play()
      .then(() => {
        setPlaying(true);
        setNeedsGesture(false);
      })
      .catch(() => {});
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl bg-[oklch(0.86_0.05_82)] ring-1 ring-foreground/10 shadow-[0_30px_60px_-30px_rgba(60,40,52,0.3)]",
        className
      )}
    >
      {src ? (
        <>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            aria-label={ariaLabel}
            className="aspect-[4/5] w-full object-cover md:aspect-[3/4]"
            autoPlay
            muted
            loop
            playsInline
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />

          {needsGesture && (
            <button
              type="button"
              onClick={startFromGesture}
              className="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20"
              aria-label="Play video with sound"
            >
              <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-[var(--plum)] shadow-lg ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-200 hover:scale-105">
                <Play className="ml-0.5 size-6" aria-hidden />
              </span>
            </button>
          )}

          {playing && !needsGesture && (
            <button
              type="button"
              onClick={toggleMute}
              className="group absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[0.75rem] font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/60"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? (
                <VolumeX className="size-3.5" aria-hidden />
              ) : (
                <Volume2 className="size-3.5" aria-hidden />
              )}
              <span>{muted ? "Tap to unmute" : "Sound on"}</span>
            </button>
          )}

          {videoCredit && (
            <div className="pointer-events-none absolute left-2 top-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
              <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
                TEMP
              </span>
              <span className="truncate">Hero video · {videoCredit}</span>
            </div>
          )}
        </>
      ) : (
        <PlaceholderState poster={poster} posterCredit={posterCredit} />
      )}
    </div>
  );
}

function PlaceholderState({
  poster,
  posterCredit,
}: {
  poster?: string;
  posterCredit?: string;
}) {
  const hasPoster = Boolean(poster);
  return (
    <div className="relative aspect-[4/5] w-full md:aspect-[3/4]">
      {hasPoster && poster ? (
        <>
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 100vw, 42vw"
            className="object-cover"
          />
          {/* subtle darken for the play button to read on any image */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-black/5 via-black/10 to-black/25"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(closest-side at 30% 40%, oklch(0.92 0.012 78 / 0.9), transparent 60%), radial-gradient(closest-side at 75% 70%, oklch(0.85 0.010 78 / 0.7), transparent 60%), linear-gradient(180deg, oklch(0.88 0.010 78), oklch(0.82 0.010 78))",
          }}
        />
      )}

      {!hasPoster && (
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, currentColor 0 1px, transparent 1px 14px)",
            color: "var(--foreground)",
          }}
        />
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-[var(--plum)] shadow-md ring-1 ring-black/5 backdrop-blur-sm">
          <Play className="ml-0.5 size-6" aria-hidden />
        </span>
        {!hasPoster && (
          <>
            <span className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-foreground/60">
              Hero video
            </span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-foreground/40">
              placeholder · add src prop when ready
            </span>
          </>
        )}
      </div>

      {hasPoster && (
        <div className="pointer-events-none absolute right-2 bottom-2 flex max-w-[calc(100%-1rem)] items-center gap-1.5 rounded-md bg-black/55 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm">
          <span className="rounded-sm bg-white/20 px-1 py-px text-[0.55rem] tracking-widest">
            TEMP
          </span>
          <span className="truncate">
            Hero poster · {posterCredit ?? "replace before launch"}
          </span>
        </div>
      )}
    </div>
  );
}
