import { motion } from "motion/react";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { projects } from "../../data/projectsData";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./ProjectsSection.css";

const premiumEase = [0.25, 0.1, 0.25, 1] as const;

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="projects" className="projects-section">
      <div className="projects-content">
        <motion.h2
          className="projects-heading gradient-heading"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
        >
          Project
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
