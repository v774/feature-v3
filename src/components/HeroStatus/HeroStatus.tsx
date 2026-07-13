import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./HeroStatus.css";

const statusPhrases = [
  "VL MOTION",
  "MOTION DESIGNER",
  "AVAILABLE WORLDWIDE",
  "NEW PROJECTS OPEN",
  "READY_",
];

export function HeroStatus() {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phrase = prefersReducedMotion ? statusPhrases[0] : statusPhrases[phraseIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      return undefined;
    }

    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % statusPhrases.length);
    }, 1800);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="hero-status" aria-hidden="true">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          className="hero-status__phrase"
          key={phrase}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.32, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {phrase === "READY_" ? (
            <>
              READY<span className="hero-status__cursor">_</span>
            </>
          ) : (
            phrase
          )}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
