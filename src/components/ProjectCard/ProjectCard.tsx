import { motion, type MotionStyle, useScroll, useTransform } from "motion/react";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { premiumEase, repeatableViewport } from "../../utils/motionConfig";
import type { Project } from "../../types/portfolioTypes";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  index: number;
  totalCards: number;
};

export function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [parallaxEnabled, setParallaxEnabled] = useState(false);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.02;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    parallaxEnabled && !prefersReducedMotion ? [6, -6] : [0, 0],
  );
  const cardStyle = {
    "--project-card-offset": `${index * 20}px`,
    scale: prefersReducedMotion ? 1 : scale,
  } as MotionStyle;
  const openProject = () => navigate(project.href);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };
  const cardDelay = prefersReducedMotion ? 0 : index * 0.12;

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const updateParallax = () => setParallaxEnabled(desktopQuery.matches);

    updateParallax();
    desktopQuery.addEventListener("change", updateParallax);
    return () => desktopQuery.removeEventListener("change", updateParallax);
  }, []);

  return (
    <div className="project-card-track" ref={trackRef}>
      <motion.article
        className="project-card"
        style={cardStyle}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={repeatableViewport}
        transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: cardDelay, ease: premiumEase }}
        whileHover={prefersReducedMotion ? undefined : { y: -4 }}
        role="link"
        tabIndex={0}
        aria-label={`Open ${project.name}`}
        onClick={openProject}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          className="project-card-surface"
          initial={prefersReducedMotion ? false : { scale: 0.97 }}
          whileInView={{ scale: 1 }}
          viewport={repeatableViewport}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: cardDelay, ease: premiumEase }}
        >
          <header className="project-card-header">
            <motion.span
              className="project-card-number"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: cardDelay + 0.08, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {project.number}
            </motion.span>
          <motion.div
            className="project-card-meta"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: cardDelay + 0.14, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="project-card-category">{project.category}</span>
            <h3 className="project-card-name">{project.name}</h3>
          </motion.div>
          <motion.div
            className="project-card-action"
            initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay: cardDelay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="project-card-link-badge">Live Project</span>
          </motion.div>
          </header>

          <motion.div
            className="project-image-grid-entrance"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.75, delay: cardDelay + 0.24, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.div className="project-image-grid" style={{ y: imageY }}>
              <div className="project-left-images">
                <motion.div
                  className="project-image-frame project-image-frame-left-top"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: cardDelay + 0.28, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img src={project.images.leftTop} alt={`${project.name} visual detail`} loading="lazy" decoding="async" />
                </motion.div>
                <motion.div
                  className="project-image-frame project-image-frame-left-bottom"
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.28 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: cardDelay + 0.36, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <img src={project.images.leftBottom} alt={`${project.name} secondary visual`} loading="lazy" decoding="async" />
                </motion.div>
              </div>
              <motion.div
                className="project-image-frame project-image-frame-right"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.28 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.65, delay: cardDelay + 0.44, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <img src={project.images.right} alt={`${project.name} featured visual`} loading="lazy" decoding="async" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.article>
    </div>
  );
}
