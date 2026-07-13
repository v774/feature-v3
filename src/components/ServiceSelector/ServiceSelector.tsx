import { useState } from "react";
import { SelectionBanner } from "../SelectionBanner/SelectionBanner";
import { ServicePill } from "../ServicePill/ServicePill";
import "./ServiceSelector.css";

const serviceOptions = ["Brand", "Digital", "Campaign", "Other"];

export function ServiceSelector() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const toggleService = (service: string) => {
    setSelectedServices((currentServices) =>
      currentServices.includes(service)
        ? currentServices.filter((item) => item !== service)
        : [...currentServices, service],
    );
  };

  return (
    <div className="service-selector">
      <h2 className="service-selector-title">What sort of service?</h2>
      <p className="service-selector-subtitle">Select all that apply</p>
      <div className="service-pills">
        {serviceOptions.map((service) => (
          <ServicePill
            key={service}
            label={service}
            active={selectedServices.includes(service)}
            onClick={() => toggleService(service)}
          />
        ))}
      </div>
      <SelectionBanner selectedServices={selectedServices} />
    </div>
  );
}
