"use client";

import * as React from "react";

type BackgroundAutoplayVideoProps = {
  src: string;
  className?: string;
};

/**
 * A decorative background video with a guarded autoplay retry for mobile
 * browsers. The rendered video keeps the same sizing and crop rules supplied
 * by its parent; this component only manages playback.
 */
export function BackgroundAutoplayVideo({
  src,
  className,
}: BackgroundAutoplayVideoProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = () => {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      void video.play().catch(() => {
        // Some browsers defer playback until enough media has loaded. The
        // loadeddata/canplay listeners below retry without changing the UI.
      });
    };

    const playWhenVisible = () => {
      if (document.visibilityState === "visible") play();
    };

    play();
    video.addEventListener("loadeddata", play, { once: true });
    video.addEventListener("canplay", play, { once: true });
    window.addEventListener("pageshow", play);
    document.addEventListener("visibilitychange", playWhenVisible);

    return () => {
      video.removeEventListener("loadeddata", play);
      video.removeEventListener("canplay", play);
      window.removeEventListener("pageshow", play);
      document.removeEventListener("visibilitychange", playWhenVisible);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
      className={className}
    />
  );
}
