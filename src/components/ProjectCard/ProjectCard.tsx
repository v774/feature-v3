import { useNavigate } from "react-router-dom";
import "./ProjectCard.css";

export function ProjectCard({ project, index, activeIndex, totalCards, onPrevious, onNext }: any) {
  const navigate = useNavigate();
  
  let relative = index - activeIndex;
  if (relative > totalCards / 2) relative -= totalCards;
  if (relative < -totalCards / 2) relative += totalCards;

  const dist = Math.abs(relative);
  const isActive = relative === 0;
  const isVisible = dist <= 2;
  const side = relative < 0 ? "left" : relative > 0 ? "right" : "center";

  const openProject = () => isActive ? navigate(project.href) : (relative < 0 ? onPrevious() : onNext());

  return (
    <article
      className={`project-card ${isActive ? "is-active" : ""} ${isVisible ? "is-visible" : ""}`.trim()}
      style={{
        "--project-translate-x": `${relative * 220}px`,
        "--project-translate-z": `${-dist * 240}px`,
        "--project-rotate-y": `${-relative * 12}deg`,
        "--project-rotate-z": `${relative * 5}deg`,
        "--project-scale": Math.max(0.64, 1 - dist * 0.15),
        "--project-dim-opacity": isActive ? 0 : Math.min(0.62, 0.28 + dist * 0.18),
        zIndex: isActive ? 30 : Math.max(1, 20 - dist),
      } as React.CSSProperties}
      role="button"
      tabIndex={isVisible ? 0 : -1}
      data-side={side}
      aria-hidden={!isVisible}
      onClick={openProject}
      onKeyDown={(e) => ["Enter", " "].includes(e.key) && (e.preventDefault(), openProject())}
    >
      <div className="project-card-media">
        <img src={project.images.right} alt={project.name} draggable={false} loading="eager" decoding="async" />
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