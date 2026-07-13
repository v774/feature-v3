import { type ReactNode, useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./Magnet.css";

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

export function Magnet({
  children,
  padding = 100,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
  className,
}: MagnetProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const transformRef = useRef("translate3d(0, 0, 0)");
  const transitionRef = useRef(inactiveTransition);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const element = elementRef.current;
    const touchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!element || reducedMotion || touchDevice) {
      return undefined;
    }

    transitionRef.current = inactiveTransition;
    element.style.transform = "translate3d(0, 0, 0)";
    element.style.transition = inactiveTransition;

    const writeTransform = (transform: string, transition: string) => {
      if (transitionRef.current !== transition) {
        transitionRef.current = transition;
        element.style.transition = transition;
      }

      if (transformRef.current !== transform) {
        transformRef.current = transform;
        element.style.transform = transform;
      }
    };

    const updateTransform = () => {
      frameRef.current = 0;

      const pointer = pointerRef.current;
      if (!pointer) {
        writeTransform("translate3d(0, 0, 0)", inactiveTransition);
        return;
      }

      const rect = element.getBoundingClientRect();
      const inside =
        pointer.x >= rect.left - padding &&
        pointer.x <= rect.right + padding &&
        pointer.y >= rect.top - padding &&
        pointer.y <= rect.bottom + padding;

      if (!inside) {
        writeTransform("translate3d(0, 0, 0)", inactiveTransition);
        return;
      }

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (pointer.x - centerX) / strength;
      const y = (pointer.y - centerY) / strength;

      writeTransform(`translate3d(${x}px, ${y}px, 0)`, activeTransition);
    };

    const requestTransformUpdate = () => {
      if (frameRef.current) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(updateTransform);
    };

    const onMouseMove = (event: MouseEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
      requestTransformUpdate();
    };

    const onScrollOrResize = () => {
      if (pointerRef.current) {
        requestTransformUpdate();
      }
    };

    const onMouseLeave = () => {
      pointerRef.current = null;
      requestTransformUpdate();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    window.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      window.removeEventListener("mouseleave", onMouseLeave);

      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }

      pointerRef.current = null;
      writeTransform("translate3d(0, 0, 0)", inactiveTransition);
    };
  }, [activeTransition, inactiveTransition, padding, reducedMotion, strength]);

  return (
    <div ref={elementRef} className={["magnet", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
