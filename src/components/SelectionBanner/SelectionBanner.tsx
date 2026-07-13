import { AnimatePresence, motion } from "motion/react";
import { scrollToHomepageSection } from "../../utils/sectionNavigation";
import "./SelectionBanner.css";

type SelectionBannerProps = {
  selectedServices: string[];
};

export function SelectionBanner({ selectedServices }: SelectionBannerProps) {
  if (selectedServices.length === 0) {
    return <p className="selection-banner-empty">Please click to select services above.</p>;
  }

  return (
    <AnimatePresence initial={false}>
      <motion.div
        className="selection-banner"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="selection-banner-message">
          Selected: <strong>{selectedServices.join(", ")}</strong>
        </p>
        <button className="selection-banner-cta" type="button" onClick={() => scrollToHomepageSection("services")}>
          Continue
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
