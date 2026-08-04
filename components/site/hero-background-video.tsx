"use client";

import * as React from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  src?: string;
  poster?: string;
  className?: string;
  ariaLabel?: string;
  /** CSS object-position for the poster/video (e.g. "50% 20%" to keep a face in frame). */
  objectPosition?: string;
};

/**
 * Full-bleed video background for hero sections. Autoplay muted loop
 * with a subtle unmute pill. Falls back to the poster image if no src
 * is provided or if the browser blocks autoplay.
 */
export function HeroBackgroundVideo({
  src,
  poster,
  className,
  ariaLabel = "Background loop",
  objectPosition,
}: Props) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = React.useState(true);
  const [videoPlaying, setVideoPlaying] = React.useState(false);

  React.useEffect(() => {
    const el = videoRef.current;
    if (!el || !src) return;
    el.muted = true;
    el.play()
      .then(() => setVideoPlaying(true))
      .catch(() => setVideoPlaying(false));
  }, [src]);

  const toggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = !el.muted;
    setMuted(el.muted);
    if (el.paused) el.play().catch(() => {});
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden bg-foreground/10", className)}>
      {/* Poster image — always rendered as the ground layer so the section
          isn't blank on slow connections or when the video can't autoplay. */}
      {poster && (
        <Image
          src={poster}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={objectPosition ? { objectPosition } : undefined}
        />
      )}

      {src && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={ariaLabel}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            videoPlaying ? "opacity-100" : "opacity-0"
          )}
          style={objectPosition ? { objectPosition } : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}

      {src && videoPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          className="absolute right-4 bottom-4 z-20 flex items-center gap-1.5 rounded-full bg-black/45 px-3 py-1.5 text-[0.72rem] font-medium text-white backdrop-blur-md transition-colors duration-200 hover:bg-black/60"
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
