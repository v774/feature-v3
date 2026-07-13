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
    const reverseFrameRef = { current: 0 };
    const reversePreviousTimeRef = { current: 0 };
    const reversePlayingRef = { current: false };
    const hasCursorTargetRef = { current: false };
    const minSeekDelta = 0.018;
    const interpolationStrength = 0.72;

    const clampTime = (time: number) => {
      const duration = Number.isFinite(video.duration) ? video.duration : 0;
      return Math.min(Math.max(time, 0), duration);
    };

    const stopReversePlayback = () => {
      reversePlayingRef.current = false;
      if (reverseFrameRef.current) {
        window.cancelAnimationFrame(reverseFrameRef.current);
        reverseFrameRef.current = 0;
      }
    };

    const playForward = () => {
      stopReversePlayback();
      video.playbackRate = 1;
      video.play().catch(() => {});
    };

    const stepReverse = (timestamp: number) => {
      if (!reversePlayingRef.current) return;
      if (!reversePreviousTimeRef.current) reversePreviousTimeRef.current = timestamp;

      const elapsedSeconds = (timestamp - reversePreviousTimeRef.current) / 1000;
      reversePreviousTimeRef.current = timestamp;
      video.currentTime = clampTime((video.currentTime || 0) - elapsedSeconds);

      if (video.currentTime <= 0.03) {
        video.currentTime = 0;
        reversePreviousTimeRef.current = 0;
        playForward();
        return;
      }

      reverseFrameRef.current = window.requestAnimationFrame(stepReverse);
    };

    const playBackward = () => {
      video.pause();
      reversePlayingRef.current = true;
      reversePreviousTimeRef.current = 0;
      reverseFrameRef.current = window.requestAnimationFrame(stepReverse);
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
      stopReversePlayback();
      video.loop = false;

      if (reducedMotionQuery.matches) {
        video.autoplay = false;
        video.pause();
        return;
      }

      if (desktopQuery.matches) {
        video.autoplay = false;
        video.pause();
      } else {
        video.autoplay = true;
        if (video.currentTime >= (video.duration || 0) - 0.03) {
          video.currentTime = 0;
        }
        playForward();
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!desktopQuery.matches || !Number.isFinite(video.duration)) {
        return;
      }
      if (reducedMotionQuery.matches) {
        return;
      }

      stopReversePlayback();
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

    const onEnded = () => {
      if (desktopQuery.matches || reducedMotionQuery.matches) return;
      playBackward();
    };

    applyMode();
    video.addEventListener("ended", onEnded);
    video.addEventListener("loadedmetadata", applyMode);
    window.addEventListener("mousemove", onMouseMove);
    desktopQuery.addEventListener("change", applyMode);
    reducedMotionQuery.addEventListener("change", applyMode);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadedmetadata", applyMode);
      window.removeEventListener("mousemove", onMouseMove);
      desktopQuery.removeEventListener("change", applyMode);
      reducedMotionQuery.removeEventListener("change", applyMode);
      stopScrubbing();
      stopReversePlayback();
    };
  }, [videoRef]);
}
