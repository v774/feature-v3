import { motion } from "motion/react";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { homepageContent } from "../../content/homepageContent";
import { featuredHomepageProjects } from "../../content/portfolioContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { premiumEase, repeatableViewport } from "../../utils/motionConfig";
import "./ProjectsSection.css";

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const projects = featuredHomepageProjects;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-content">
        <motion.h2
          className="projects-heading gradient-heading"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={repeatableViewport}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
        >
          {homepageContent.projects.heading}
        </motion.h2>
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
