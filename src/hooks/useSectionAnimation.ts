import { useAnimationControls } from "motion/react";
import { useCallback, useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

type SectionAnimationOptions = {
  activationThreshold?: number;
  resetThreshold?: number;
  minCycleMs?: number;
};

export function useSectionAnimation<T extends Element>({
  activationThreshold = 0.4,
  resetThreshold = 0.08,
  minCycleMs = 1000,
}: SectionAnimationOptions = {}): {
  setRef: (element: T | null) => void;
  controls: ReturnType<typeof useAnimationControls>;
  initial: "hidden" | false;
} {
  const ref = useRef<T>(null);
  const controls = useAnimationControls();
  const prefersReducedMotion = useReducedMotion();
  const isVisibleRef = useRef(false);
  const lastActivationRef = useRef(0);
  const resetTimeoutRef = useRef(0);
  const latestRatioRef = useRef(0);
  const setRef = useCallback((element: T | null) => {
    ref.current = element;
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      controls.set("visible");
      return undefined;
    }

    const element = ref.current;
    if (!element) return undefined;

    const clearPendingReset = () => {
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = 0;
      }
    };

    const resetWhenEligible = () => {
      clearPendingReset();
      const elapsed = performance.now() - lastActivationRef.current;
      const reset = () => {
        if (latestRatioRef.current <= resetThreshold) {
          isVisibleRef.current = false;
          controls.set("hidden");
        }
      };

      if (elapsed < minCycleMs) {
        resetTimeoutRef.current = window.setTimeout(reset, minCycleMs - elapsed);
      } else {
        reset();
      }
    };

    const thresholds = Array.from(
      new Set([0, resetThreshold, activationThreshold, 1]),
    ).sort((a, b) => a - b);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry?.intersectionRatio ?? 0;
        latestRatioRef.current = ratio;

        if (ratio >= activationThreshold) {
          clearPendingReset();
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            lastActivationRef.current = performance.now();
            void controls.start("visible");
          }
          return;
        }

        if (isVisibleRef.current && ratio <= resetThreshold) {
          resetWhenEligible();
        }
      },
      { threshold: thresholds },
    );

    observer.observe(element);

    return () => {
      clearPendingReset();
      observer.disconnect();
    };
  }, [activationThreshold, controls, minCycleMs, prefersReducedMotion, resetThreshold]);

  return {
    setRef,
    controls,
    initial: prefersReducedMotion ? false : "hidden",
  };
}
