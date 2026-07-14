import { type RefObject, useEffect } from "react";

export function useVideoScrubbing(videoRef: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targetTimeRef = { current: 0 };
    const frameRef = { current: 0 };
    const hasCursorTargetRef = { current: false };
    const minSeekDelta = 0.018;
    const interpolationStrength = 0.72;

    const clampTime = (time: number) => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      return Math.min(Math.max(time, 0), duration);
    };

    const stopScrubbing = () => {
      hasCursorTargetRef.current = false;
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }
    };

    const stepScrub = () => {
      frameRef.current = 0;

      if (!hasCursorTargetRef.current || !desktopQuery.matches || reducedMotionQuery.matches) {
        return;
      }

      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      if (duration <= 0) {
        return;
      }

      const currentTime = video.currentTime || 0;
      const targetTime = clampTime(targetTimeRef.current);
      const difference = targetTime - currentTime;
      const isEdgeTarget = targetTime <= minSeekDelta || targetTime >= duration - minSeekDelta;

      if (isEdgeTarget) {
        if (Math.abs(difference) > 0.002) {
          video.currentTime = targetTime;
        }
        return;
      }

      if (Math.abs(difference) <= minSeekDelta) {
        return;
      }

      if (!video.seeking) {
        video.currentTime = clampTime(currentTime + difference * interpolationStrength);
      }

      frameRef.current = window.requestAnimationFrame(stepScrub);
    };

    const applyMode = () => {
      targetTimeRef.current = video.currentTime || 0;
      stopScrubbing();

      if (reducedMotionQuery.matches) {
        video.autoplay = false;
        video.loop = false;
        video.pause();
        return;
      }

      if (desktopQuery.matches) {
        video.autoplay = false;
        video.loop = false;
        video.pause();
      } else {
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.play().catch(() => {});
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!desktopQuery.matches || !Number.isFinite(video.duration) || reducedMotionQuery.matches) {
        return;
      }

      if (!video.paused) {
        video.pause();
      }

      const viewportWidth = Math.max(window.innerWidth, 1);
      const progress = Math.min(Math.max(event.clientX / viewportWidth, 0), 1);
      targetTimeRef.current = progress * video.duration;
      hasCursorTargetRef.current = true;

      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(stepScrub);
      }
    };

    applyMode();
    video.addEventListener("loadedmetadata", applyMode);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    desktopQuery.addEventListener("change", applyMode);
    reducedMotionQuery.addEventListener("change", applyMode);

    return () => {
      video.removeEventListener("loadedmetadata", applyMode);
      window.removeEventListener("mousemove", onMouseMove);
      desktopQuery.removeEventListener("change", applyMode);
      reducedMotionQuery.removeEventListener("change", applyMode);
      stopScrubbing();
    };
  }, [videoRef]);
}