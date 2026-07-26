import { useRef } from "react";
import { useHeroImageSequence } from "../../hooks/useHeroImageSequence";
import { homepageContent } from "../../content/homepageContent";
import "./BackgroundVideo.css";

export function BackgroundVideo() {
  const sequenceRef = useRef<HTMLCanvasElement>(null);
  const heroData = homepageContent.hero;
  useHeroImageSequence(sequenceRef, heroData.desktopSequence);

  return (
    <div className="background-video" aria-hidden="true">
      <canvas ref={sequenceRef} className="background-video-sequence" />
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={heroData.posterSrc}
        className="background-video-media"
        src={heroData.localVideoSrc}
      />
    </div>
  );
}
