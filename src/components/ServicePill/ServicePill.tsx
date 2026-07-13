import { Check } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { ServicePillProps } from "../../types/portfolioTypes";
import "./ServicePill.css";

export function ServicePill({ label, active, onClick }: ServicePillProps) {
  return (
    <motion.button
      type="button"
      className={`service-pill ${active ? "service-pill--active" : "service-pill--inactive"}`}
      aria-pressed={active}
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
    >
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            className="service-pill-icon"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            aria-hidden="true"
          >
            <Check size={16} strokeWidth={2.5} />
          </motion.span>
        )}
      </AnimatePresence>
      <span>{label}</span>
    </motion.button>
  );
}
