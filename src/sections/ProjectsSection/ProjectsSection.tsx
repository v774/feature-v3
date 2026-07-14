import { motion } from "motion/react";
import { ProjectCard } from "../../components/ProjectCard/ProjectCard";
import { homepageContent } from "../../content/homepageContent";
import { featuredHomepageProjects } from "../../content/portfolioContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useSectionAnimation } from "../../hooks/useSectionAnimation";
import { premiumEase } from "../../utils/motionConfig";
import "./ProjectsSection.css";

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const {
    setRef: setSectionRef,
    controls: sectionControls,
    initial: sectionInitial,
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.28,
    resetThreshold: 0.03,
  });
  const projects = featuredHomepageProjects;

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
          {homepageContent.projects.heading}
        </motion.h2>
        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              totalCards={projects.length}
              entranceControls={sectionControls}
              entranceInitial={sectionInitial}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
