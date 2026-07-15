import { type CSSProperties, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { FeaturedHomepageProject } from "../../content/portfolioContent";
import "./ProjectCard.css";

type ProjectCardProps = {
  project: FeaturedHomepageProject;
  index: number;
  activeIndex: number;
  totalCards: number;
  onPrevious: () => void;
  onNext: () => void;
};

function getRelativeIndex(index: number, activeIndex: number, totalCards: number) {
  let relative = index - activeIndex;

  if (relative > totalCards / 2) relative -= totalCards;
  if (relative < -totalCards / 2) relative += totalCards;

  return relative;
}

export function ProjectCard({ project, index, activeIndex, totalCards, onPrevious, onNext }: ProjectCardProps) {
  const navigate = useNavigate();
  const relativeIndex = getRelativeIndex(index, activeIndex, totalCards);
  const distance = Math.abs(relativeIndex);
  const isActive = relativeIndex === 0;
  const isVisible = distance <= 2;
  const side = relativeIndex < 0 ? "left" : relativeIndex > 0 ? "right" : "center";
  const translateX = relativeIndex * 220;
  const translateZ = -distance * 240;
  const rotateY = -relativeIndex * 12;
  const rotateZ = relativeIndex * 5;
  const scale = Math.max(0.64, 1 - distance * 0.15);
  const dimOpacity = isActive ? 0 : Math.min(0.62, 0.28 + distance * 0.18);
  const zIndex = isActive ? 30 : Math.max(1, 20 - distance);

  const openProject = () => {
    if (isActive) {
      navigate(project.href);
      return;
    }

    if (relativeIndex < 0) {
      onPrevious();
      return;
    }

    onNext();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject();
    }
  };

  return (
    <article
      className={`project-card${isActive ? " is-active" : ""}${isVisible ? " is-visible" : ""}`}
      style={{
        "--project-translate-x": `${translateX}px`,
        "--project-translate-z": `${translateZ}px`,
        "--project-rotate-y": `${rotateY}deg`,
        "--project-rotate-z": `${rotateZ}deg`,
        "--project-scale": scale,
        "--project-dim-opacity": dimOpacity,
        zIndex,
      } as CSSProperties}
      role="button"
      tabIndex={isVisible ? 0 : -1}
      data-side={side}
      aria-label={isActive ? `Open ${project.name}` : side === "left" ? "Show previous project" : "Show next project"}
      aria-hidden={!isVisible}
      onClick={openProject}
      onKeyDown={handleKeyDown}
    >
      <div className="project-card-media">
        <img src={project.images.right} alt={`${project.name} featured visual`} draggable={false} loading="eager" decoding="async" />
        <span className="project-card-shade" aria-hidden="true" />
        <span className="project-card-dim" aria-hidden="true" />
      </div>
      <div className="project-card-caption">
        <span>{project.category}</span>
        <strong>{project.name}</strong>
      </div>
    </article>
  );
}
