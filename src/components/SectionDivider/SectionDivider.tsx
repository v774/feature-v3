import { useEffect, useRef } from "react";
import "./SectionDivider.css";

export type SectionDividerVariant = "dark" | "light" | "transition" | "circuit";

type SectionDividerProps = {
  variant: SectionDividerVariant;
};

export function SectionDivider({ variant }: SectionDividerProps) {
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      divider.dataset.visible = "true";
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        divider.dataset.visible = "true";
        observer.disconnect();
      },
      {
        threshold: 0.5,
        rootMargin: "-10% 0px -10% 0px",
      },
    );

    observer.observe(divider);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={dividerRef}
      className={`section-divider section-divider--${variant}`}
      aria-hidden="true"
    >
      <div className="section-divider__visual">
        {(variant === "circuit" || variant === "transition") && (
          <svg
            className="section-divider__circuit"
            viewBox="0 0 1440 48"
            preserveAspectRatio="none"
            focusable="false"
          >
            <path pathLength="1" d="M0 8H250L280 24H470L500 8H620" />
            <path pathLength="1" d="M1440 8H1190L1160 24H970L940 8H820" />
            <circle cx="250" cy="8" r="3.5" />
            <circle cx="280" cy="24" r="3.5" />
            <circle cx="1190" cy="8" r="3.5" />
            <circle cx="1160" cy="24" r="3.5" />
          </svg>
        )}
        <span className="section-divider__line" />
        <span className="section-divider__node section-divider__node--left" />
        <span className="section-divider__node section-divider__node--right" />
      </div>
    </div>
  );
}
