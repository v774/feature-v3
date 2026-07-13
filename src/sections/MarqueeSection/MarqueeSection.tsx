import { useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { homepageContent } from "../../content/homepageContent";
import { marqueeProjects, type MarqueeProject } from "../../content/portfolioContent";
import "./MarqueeSection.css";

const repeatCount = 8;
const repeatProjects = (projects: MarqueeProject[]) =>
  Array.from({ length: repeatCount }, () => projects).flat();

const wrapOffset = (value: number, width: number) => {
  if (width <= 0) {
    return 0;
  }

  return ((value % width) + width) % width;
};

export function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const firstRowRef = useRef<HTMLDivElement>(null);
  const secondRowRef = useRef<HTMLDivElement>(null);
  const rows = useMemo(
    () => [
      repeatProjects(marqueeProjects.filter((_, index) => index % 2 === 0)),
      repeatProjects(marqueeProjects.filter((_, index) => index % 2 === 1)),
    ],
    [],
  );

  useEffect(() => {
    let frameId = 0;

    const updateRows = () => {
      const section = sectionRef.current;
      const firstRow = firstRowRef.current;
      const secondRow = secondRowRef.current;
      if (!section || !firstRow || !secondRow) {
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      const firstSequenceWidth = firstRow.scrollWidth / repeatCount;
      const secondSequenceWidth = secondRow.scrollWidth / repeatCount;
      const firstWrappedOffset = wrapOffset(offset, firstSequenceWidth);
      const secondWrappedOffset = wrapOffset(offset, secondSequenceWidth);

      firstRow.style.transform = `translateX(${-firstSequenceWidth + firstWrappedOffset}px)`;
      secondRow.style.transform = `translateX(${-secondWrappedOffset}px)`;
    };

    const requestUpdate = () => {
      if (frameId) {
        return;
      }
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        updateRows();
      });
    };

    updateRows();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section className="marquee-section" ref={sectionRef} aria-label={homepageContent.marquee.ariaLabel}>
      <div className="marquee-rows">
        <div className="marquee-row" ref={firstRowRef}>
          {rows[0].map((project, index) => (
            <Link className="marquee-tile" key={`first-${project.id}-${index}`} to={project.href ?? "/"}>
              {project.type === "video" ? (
                <video className="marquee-image" src={project.src} poster={project.poster} muted loop playsInline autoPlay preload="metadata" />
              ) : (
                <img className="marquee-image" src={project.src} alt={project.alt} loading="lazy" decoding="async" />
              )}
            </Link>
          ))}
        </div>
        <div className="marquee-row" ref={secondRowRef}>
          {rows[1].map((project, index) => (
            <Link className="marquee-tile" key={`second-${project.id}-${index}`} to={project.href ?? "/"}>
              {project.type === "video" ? (
                <video className="marquee-image" src={project.src} poster={project.poster} muted loop playsInline autoPlay preload="metadata" />
              ) : (
                <img className="marquee-image" src={project.src} alt={project.alt} loading="lazy" decoding="async" />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
