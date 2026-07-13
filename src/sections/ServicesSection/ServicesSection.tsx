import { FadeIn } from "../../components/FadeIn/FadeIn";
import { services } from "../../data/servicesData";
import "./ServicesSection.css";

export function ServicesSection() {
  return (
    <section id="services" className="services-section">
      <div className="services-content">
        <FadeIn>
          <h2 className="services-heading">Services</h2>
        </FadeIn>
        <div className="services-list">
          {services.map((service, index) => (
            <FadeIn className="service-item" key={service.number} delay={index * 0.1}>
              <div className="service-number">{service.number}</div>
              <div className="service-copy">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
