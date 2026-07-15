import { motion } from "motion/react";
import { useCallback, useRef, useState, type PointerEvent } from "react";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { homepageContent } from "../../content/homepageContent";
import { featuredHomepageProjects } from "../../content/portfolioContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useSectionAnimation } from "../../hooks/useSectionAnimation";
import { premiumEase } from "../../utils/motionConfig";
import "./ProjectsSection.css";

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const inputLockedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragDeltaXRef = useRef(0);
  const suppressClickRef = useRef(false);
  const coverflowRef = useRef<HTMLDivElement>(null);
  const {
    setRef: setSectionRef,
    controls: sectionControls,
    initial: sectionInitial,
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.28,
    resetThreshold: 0.03,
  });
  const projects = featuredHomepageProjects;
  const activeProject = projects[activeIndex] ?? projects[0];
  const projectsHeading = homepageContent.projects.heading.toUpperCase();
  const activeProjectTitle = activeProject?.name.toUpperCase() ?? "";
  const lockInput = useCallback(() => {
    inputLockedRef.current = true;
    window.setTimeout(() => {
      inputLockedRef.current = false;
    }, prefersReducedMotion ? 0 : 620);
  }, [prefersReducedMotion]);

  const stepCard = useCallback((direction: number) => {
    if (inputLockedRef.current || projects.length < 2) return;
    lockInput();
    setActiveIndex((current) => (((current + direction) % projects.length) + projects.length) % projects.length);
  }, [lockInput, projects.length]);

  const handlePrevious = useCallback(() => {
    stepCard(-1);
  }, [stepCard]);

  const handleNext = useCallback(() => {
    stepCard(1);
  }, [stepCard]);

  const setDragOffset = useCallback((value: number) => {
    coverflowRef.current?.style.setProperty("--project-drag-x", `${value}px`);
  }, []);

  const resetDrag = useCallback(() => {
    draggingRef.current = false;
    setIsDragging(false);
    dragStartXRef.current = 0;
    dragDeltaXRef.current = 0;
    setDragOffset(0);
  }, [setDragOffset]);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "touch") return;
    if (inputLockedRef.current) return;
    if (projects.length < 2) return;
    draggingRef.current = true;
    dragStartXRef.current = event.clientX;
    dragDeltaXRef.current = 0;
    setIsDragging(true);
    setDragOffset(0);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = event.clientX - dragStartXRef.current;
    dragDeltaXRef.current = delta;
    setDragOffset(Math.max(-90, Math.min(90, delta * 0.28)));
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const delta = dragDeltaXRef.current;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    resetDrag();

    if (Math.abs(delta) < 42) return;
    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 140);
    stepCard(delta < 0 ? 1 : -1);
  };

  return (
    <section id="projects" className="projects-section" ref={setSectionRef}>
      <div className="projects-content">
        <motion.h2
          className="projects-heading gradient-heading"
          initial={sectionInitial}
          animate={sectionControls}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.96 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
        >
          {projectsHeading}
        </motion.h2>
        <motion.div
          ref={coverflowRef}
          className="projects-coverflow"
          data-dragging={isDragging ? "true" : "false"}
          role="region"
          aria-label="Featured projects"
          tabIndex={0}
          initial={sectionInitial}
          animate={sectionControls}
          variants={{
            hidden: { opacity: 0, y: 42, scale: 0.98 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.78, ease: premiumEase }}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              handleNext();
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              handlePrevious();
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerEnd}
          onPointerCancel={handlePointerEnd}
          onClickCapture={(event) => {
            if (!suppressClickRef.current) return;
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <button
            className="projects-side-hit projects-side-hit--left"
            type="button"
            aria-label="Show previous project"
            onClick={(event) => {
              event.stopPropagation();
              handlePrevious();
            }}
          />
          <button
            className="projects-side-hit projects-side-hit--right"
            type="button"
            aria-label="Show next project"
            onClick={(event) => {
              event.stopPropagation();
              handleNext();
            }}
          />
          <div className="projects-coverflow-stage">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.number}
                project={project}
                index={index}
                activeIndex={activeIndex}
                totalCards={projects.length}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            ))}
          </div>
        </motion.div>
        {activeProject && (
          <motion.div
            className="projects-active-copy"
            key={activeProject.number}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.44, ease: premiumEase }}
          >
            <div className="projects-active-meta">
              <button
                className="projects-step-button"
                type="button"
                aria-label="Previous project"
                onClick={handlePrevious}
              >
                {"<"}
              </button>
              <span>{activeProject.number} / {String(projects.length).padStart(2, "0")}</span>
              <button
                className="projects-step-button"
                type="button"
                aria-label="Next project"
                onClick={handleNext}
              >
                {">"}
              </button>
            </div>
            <h3 className="projects-active-title">{activeProjectTitle}</h3>
            <p>{activeProject.description}</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
