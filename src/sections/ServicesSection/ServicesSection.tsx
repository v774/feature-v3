import { motion } from "motion/react";
import { services } from "../../data/servicesData";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./ServicesSection.css";

const premiumEase = [0.25, 0.1, 0.25, 1] as const;

export function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();
  const headingInitial = prefersReducedMotion ? false : { opacity: 0, y: 50, scale: 0.96 };
  const headingVisible = { opacity: 1, y: 0, scale: 1 };

  return (
    <section id="services" className="services-section">
      <div className="services-content">
        <motion.h2
          className="services-heading"
          initial={headingInitial}
          whileInView={headingVisible}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: premiumEase }}
        >
          Services
        </motion.h2>
        <div className="services-list">
          {services.map((service, index) => {
            const delay = prefersReducedMotion ? 0 : index * 0.1;

            return (
              <motion.div className="service-item" key={service.number}>
                <motion.div
                  className="service-number-motion"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay, ease: premiumEase }}
                >
                  <div className="service-number">{service.number}</div>
                </motion.div>
                <motion.div
                  className="service-copy-motion"
                  initial={prefersReducedMotion ? false : { opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.7, delay, ease: premiumEase }}
                >
                  <div className="service-copy">
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </motion.div>
                <motion.div
                  className="service-divider"
                  initial={prefersReducedMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
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
