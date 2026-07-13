import { motion, type MotionStyle, useScroll, useTransform } from "motion/react";
import { type KeyboardEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../../types/portfolioTypes";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: Project;
  index: number;
  totalCards: number;
};

export function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start end", "end start"],
  });
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const cardStyle = {
    "--project-card-offset": `${index * 28}px`,
    scale,
  } as MotionStyle;
  const openProject = () => navigate(project.href);
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <div className="project-card-track" ref={trackRef}>
      <motion.article
        className="project-card"
        style={cardStyle}
        role="link"
        tabIndex={0}
        aria-label={`Open ${project.name}`}
        onClick={openProject}
        onKeyDown={handleKeyDown}
      >
        <header className="project-card-header">
          <span className="project-card-number">{project.number}</span>
          <div className="project-card-meta">
            <span className="project-card-category">{project.category}</span>
            <h3 className="project-card-name">{project.name}</h3>
          </div>
          <div className="project-card-action">
            <span className="project-card-link-badge">Live Project</span>
          </div>
        </header>

        <div className="project-image-grid">
          <div className="project-left-images">
            <div className="project-image-frame project-image-frame-left-top">
              <img src={project.images.leftTop} alt={`${project.name} visual detail`} loading="lazy" decoding="async" />
            </div>
            <div className="project-image-frame project-image-frame-left-bottom">
              <img src={project.images.leftBottom} alt={`${project.name} secondary visual`} loading="lazy" decoding="async" />
            </div>
          </div>
          <div className="project-image-frame project-image-frame-right">
            <img src={project.images.right} alt={`${project.name} featured visual`} loading="lazy" decoding="async" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
