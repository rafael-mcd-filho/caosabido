import { useEffect, useMemo, useRef, useState } from "react";

export default function LazyVideo({
  sources = [],
  className = "",
  videoClassName = "",
  startMuted = true,
  controls = true,
  objectFit = "cover",
  aspectRatio = "aspect-[9/16]",
  onPlay,
  onPause,
  onEnded,
  rounded = "rounded-2xl",
}) {
  const [isActive, setIsActive] = useState(false);
  const videoRef = useRef(null);

  const chosenSrc = useMemo(() => {
    if (!sources.length) return "";
    const width = typeof window !== "undefined" ? window.innerWidth : 1024;

    if (width <= 640) return sources[0].src;

    return sources[sources.length - 1].src;
  }, [sources]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => onPlay?.();
    const handlePause = () => onPause?.();
    const handleEnded = () => onEnded?.();

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onPlay, onPause, onEnded]);

  const handleClick = () => {
    setIsActive(true);

    requestAnimationFrame(async () => {
      try {
        if (!videoRef.current) return;
        videoRef.current.currentTime = 0;
        await videoRef.current.play();
      } catch {
        // Keep controls visible if the browser requires another interaction.
      }
    });
  };

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={`relative overflow-hidden bg-black shadow-2xl ${aspectRatio} ${rounded} ${className}`}>
      <video
        ref={videoRef}
        className={`h-full w-full ${fitClass} ${videoClassName}`}
        controls={isActive && controls}
        muted={startMuted}
        playsInline
        preload="metadata"
        src={chosenSrc}
      />

      {!isActive && (
        <button
          type="button"
          onClick={handleClick}
          className="group absolute inset-0 block w-full"
          aria-label="Reproduzir video"
        >
          <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/15" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 transition-transform group-hover:scale-110">
              <div className="ml-1 h-0 w-0 border-b-[12px] border-l-[18px] border-t-[12px] border-b-transparent border-l-amber-600 border-t-transparent" />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
