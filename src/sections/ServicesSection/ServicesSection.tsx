import { motion } from "motion/react";
import { homepageContent } from "../../content/homepageContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useSectionAnimation } from "../../hooks/useSectionAnimation";
import { premiumEase } from "../../utils/motionConfig";
import "./ServicesSection.css";

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const {
    setRef: setSectionRef,
    controls: sectionControls,
    initial: sectionInitial,
  } = useSectionAnimation<HTMLElement>();
  const services = homepageContent.services.items;

  return (
    <section id="services" className="services-section" ref={setSectionRef}>
      <div className="services-content">
        <motion.h2
          className="services-heading"
          initial={sectionInitial}
          animate={sectionControls}
          variants={{
            hidden: { opacity: 0, y: 50, scale: 0.96 },
            visible: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
        >
          {homepageContent.services.heading}
        </motion.h2>
        <div className="services-list">
          {services.map((service, index) => {
            const delay = prefersReducedMotion ? 0 : index * 0.1;

            return (
              <motion.div className="service-item" key={service.number}>
                <motion.div
                  className="service-number-motion"
                  initial={sectionInitial}
                  animate={sectionControls}
                  variants={{
                    hidden: { opacity: 0, x: -40 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay, ease: premiumEase }}
                >
                  <div className="service-number">{service.number}</div>
                </motion.div>
                <motion.div
                  className="service-copy-motion"
                  initial={sectionInitial}
                  animate={sectionControls}
                  variants={{
                    hidden: { opacity: 0, x: 40 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay, ease: premiumEase }}
                >
                  <div className="service-copy">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="service-divider"
                  initial={sectionInitial}
                  animate={sectionControls}
                  variants={{
                    hidden: { scaleX: 0 },
                    visible: { scaleX: 1 },
                  }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.8, delay: delay + 0.18, ease: premiumEase }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
