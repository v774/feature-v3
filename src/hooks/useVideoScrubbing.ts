import { type RefObject, useEffect } from "react";

const MOBILE_REVERSE_EDGE = 0.04;
const MOBILE_REVERSE_SPEED = 1;

export function useVideoScrubbing(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileFrameRef = { current: 0 };
    const mobilePreviousTimestampRef = { current: 0 };
    const mobileDirectionRef = { current: "forward" as "forward" | "backward" };

    const stopMobilePlayback = () => {
      if (mobileFrameRef.current) {
        window.cancelAnimationFrame(mobileFrameRef.current);
        mobileFrameRef.current = 0;
      }
      mobilePreviousTimestampRef.current = 0;
    };

    const queueMobileFrame = (callback: FrameRequestCallback) => {
      if (!mobileFrameRef.current) {
        mobileFrameRef.current = window.requestAnimationFrame(callback);
      }
    };

    const stepMobileForward = () => {
      mobileFrameRef.current = 0;

      if (desktopQuery.matches || reducedMotionQuery.matches) return;

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration <= 0) {
        queueMobileFrame(stepMobileForward);
        return;
      }

      if (video.currentTime >= duration - MOBILE_REVERSE_EDGE) {
        mobileDirectionRef.current = "backward";
        mobilePreviousTimestampRef.current = 0;
        video.pause();
        video.currentTime = Math.max(MOBILE_REVERSE_EDGE, duration - MOBILE_REVERSE_EDGE);
        queueMobileFrame(stepMobileBackward);
        return;
      }

      queueMobileFrame(stepMobileForward);
    };

    const stepMobileBackward = (timestamp: number) => {
      mobileFrameRef.current = 0;

      if (desktopQuery.matches || reducedMotionQuery.matches) return;

      if (!mobilePreviousTimestampRef.current) {
        mobilePreviousTimestampRef.current = timestamp;
      }

      const deltaSeconds = (timestamp - mobilePreviousTimestampRef.current) / 1000;
      mobilePreviousTimestampRef.current = timestamp;
      video.currentTime = Math.max(
        MOBILE_REVERSE_EDGE,
        video.currentTime - deltaSeconds * MOBILE_REVERSE_SPEED,
      );

      if (video.currentTime <= MOBILE_REVERSE_EDGE) {
        mobileDirectionRef.current = "forward";
        mobilePreviousTimestampRef.current = 0;
        video.currentTime = MOBILE_REVERSE_EDGE;
        video.play().catch(() => undefined);
        queueMobileFrame(stepMobileForward);
        return;
      }

      queueMobileFrame(stepMobileBackward);
    };

    const startMobilePingPong = () => {
      stopMobilePlayback();
      mobilePreviousTimestampRef.current = 0;
      video.autoplay = true;
      video.loop = false;
      video.muted = true;
      video.playsInline = true;

      if (mobileDirectionRef.current === "backward") {
        video.pause();
        queueMobileFrame(stepMobileBackward);
        return;
      }

      video.play().catch(() => undefined);
      queueMobileFrame(stepMobileForward);
    };

    const applyMode = () => {
      stopMobilePlayback();
      video.loop = false;

      if (reducedMotionQuery.matches || desktopQuery.matches) {
        video.autoplay = false;
        video.pause();
        return;
      }

      startMobilePingPong();
    };

    applyMode();
    video.addEventListener("loadedmetadata", applyMode);
    desktopQuery.addEventListener("change", applyMode);
    reducedMotionQuery.addEventListener("change", applyMode);

    return () => {
      video.removeEventListener("loadedmetadata", applyMode);
      desktopQuery.removeEventListener("change", applyMode);
      reducedMotionQuery.removeEventListener("change", applyMode);
      stopMobilePlayback();
    };
  }, [videoRef]);
}
