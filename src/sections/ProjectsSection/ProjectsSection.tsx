import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../data/projectsData";
import "./ProjectsSection.css";

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section">
      <div className="projects-content">
        <h2 className="projects-heading gradient-heading">Project</h2>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projects.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
