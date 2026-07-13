import { useRef } from "react";
import { useVideoScrubbing } from "../../hooks/useVideoScrubbing";
import { homepageContent } from "../../content/homepageContent";
import "./BackgroundVideo.css";

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroData = homepageContent.hero;
  useVideoScrubbing(videoRef);

  return (
    <div className="background-video" aria-hidden="true">
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        className="background-video-media"
        loop
        src={heroData.localVideoSrc}
      />
    </div>
  );
}
