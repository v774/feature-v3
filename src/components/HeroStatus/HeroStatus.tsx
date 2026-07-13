import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { siteContent } from "../../content/siteContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./HeroStatus.css";

const statusPhrases = siteContent.heroStatusPhrases;

export function HeroStatus() {
  const prefersReducedMotion = useReducedMotion();
  const [phraseIndex, setPhraseIndex] = useState(0);
  const phraseIndexRef = useRef(0);
  const frameRef = useRef(0);
  const pointerXRef = useRef(0);
  const phrase = prefersReducedMotion ? statusPhrases[0] : statusPhrases[phraseIndex];

  useEffect(() => {
    if (prefersReducedMotion) {
      setPhraseIndex(0);
      phraseIndexRef.current = 0;
      return undefined;
    }

    const updatePhraseFromPointer = () => {
      frameRef.current = 0;
      const progress = Math.min(Math.max(pointerXRef.current / Math.max(window.innerWidth, 1), 0), 1);
      const nextIndex = Math.min(statusPhrases.length - 1, Math.floor(progress * statusPhrases.length));

      if (nextIndex !== phraseIndexRef.current) {
        phraseIndexRef.current = nextIndex;
        setPhraseIndex(nextIndex);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      pointerXRef.current = event.clientX;
      if (!frameRef.current) {
        frameRef.current = window.requestAnimationFrame(updatePhraseFromPointer);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
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
