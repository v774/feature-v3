import { motion } from "motion/react";
import { BackgroundVideo } from "../../components/BackgroundVideo/BackgroundVideo";
import { HeroStatus } from "../../components/HeroStatus/HeroStatus";
import { homepageContent } from "../../content/homepageContent";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useScrambleText } from "../../hooks/useScrambleText";
import { useSectionAnimation } from "../../hooks/useSectionAnimation";
import { scrollToHomepageSection } from "../../utils/sectionNavigation";
import "./HeroSection.css";

type HeroSectionProps = {
  onShowreel: () => void;
};

export function HeroSection({ onShowreel }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const heroData = homepageContent.hero;
  const {
    setRef: setHeroRef,
    controls: heroControls,
    initial: heroInitial,
    isActive: heroIsActive,
  } = useSectionAnimation<HTMLElement>({
    activationThreshold: 0.35,
    resetThreshold: 0.03,
  });
  const { displayed, done } = useScrambleText(
    heroData.headline,
    800,
    heroIsActive && !prefersReducedMotion,
  );
  const headline = prefersReducedMotion ? heroData.headline : displayed;

  return (
    <section id="home" className="hero-section" ref={setHeroRef}>
      <BackgroundVideo />
      <div className="hero-dot-overlay" aria-hidden="true" />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="hero-watermark" aria-hidden="true">
        {heroData.watermark}
      </div>
      <HeroStatus />
      <div className="hero-content-layer">
        <div className="hero-spacer" aria-hidden="true" />
        <main id="spade-hero" className="hero-bottom-row">
          <div className="hero-copy-column">
            <motion.p
              className="hero-kicker"
              initial={heroInitial}
              animate={heroControls}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {heroData.kicker}
            </motion.p>
            <motion.h1
              className="hero-headline"
              initial={heroInitial}
              animate={heroControls}
              variants={{
                hidden: { opacity: 0, y: 28 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ delay: 0.8, duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
            >
              {headline}
              {!prefersReducedMotion && (
                <span className={`hero-type-cursor${done ? " is-blinking" : ""}`} aria-hidden="true">
                  |
                </span>
              )}
            </motion.h1>
          </div>

          <motion.div
            className="hero-detail-column"
            initial={heroInitial}
            animate={heroControls}
            variants={{
              hidden: { opacity: 0, y: 25 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ delay: 1, duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <p className="hero-description">{heroData.description}</p>
            <div className="hero-actions">
              <button className="hero-primary-link" type="button" onClick={() => scrollToHomepageSection("projects")}>
                {heroData.primaryCta}
              </button>
              <button className="hero-secondary-link" type="button" onClick={onShowreel}>
                {heroData.secondaryCta}
              </button>
            </div>
            <aside className="hero-meta" aria-label={heroData.highlightsAriaLabel}>
              <span>{heroData.availability}</span>
              <span>{heroData.location}</span>
              <span>{heroData.highlights.join(" / ")}</span>
            </aside>
          </motion.div>
        </main>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
