import { useRef } from "react";
import { useHeroImageSequence } from "../../hooks/useHeroImageSequence";
import { useVideoScrubbing } from "../../hooks/useVideoScrubbing";
import { homepageContent } from "../../content/homepageContent";
import "./BackgroundVideo.css";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sequenceRef = useRef<HTMLCanvasElement>(null);
  const heroData = homepageContent.hero;
  useVideoScrubbing(videoRef);
  useHeroImageSequence(sequenceRef, heroData.desktopSequence);

  return (
    <div className="background-video" aria-hidden="true">
      <canvas ref={sequenceRef} className="background-video-sequence" />
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="background-video-media"
        src={heroData.localVideoSrc}
      />
    </div>
  );
}
