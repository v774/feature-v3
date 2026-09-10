import { useRef, useEffect } from "react";
import { useHeroImageSequence } from "../../hooks/useHeroImageSequence";
import { homepageContent } from "../../content/homepageContent";
import "./BackgroundVideo.css";

export function BackgroundVideo() {
  const sequenceRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { desktopSequence, posterSrc, localVideoSrc } = homepageContent.hero;
  
  useHeroImageSequence(sequenceRef, desktopSequence);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="background-video" aria-hidden="true">
      <canvas ref={sequenceRef} className="background-video-sequence" />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="background-video-media"
        src={localVideoSrc}
      />
    </div>
  );
}