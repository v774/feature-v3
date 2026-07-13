import { Magnet } from "../Magnet/Magnet";
import { scrollToHomepageSection } from "../../utils/sectionNavigation";
import "./ContactButton.css";

export function ContactButton() {
  return (
    <Magnet strength={5} padding={60}>
      <button className="contact-button" type="button" onClick={() => scrollToHomepageSection("contact-form")}>
        Contact Me
      </button>
    </Magnet>
  );
}
