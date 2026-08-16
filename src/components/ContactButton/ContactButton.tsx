import { Magnet } from "../Magnet/Magnet";
import { siteContent } from "../../content/siteContent";
import { scrollToHomepageSection } from "../../utils/sectionNavigation";
import "./ContactButton.css";

export function ContactButton({ label = siteContent.contactButtonLabel }: { label?: string }) {
  return (
    <Magnet strength={5} padding={60}>
      <button className="contact-button" type="button" onClick={() => scrollToHomepageSection("contact-form")}>
        {label}
      </button>
    </Magnet>
  );
}
