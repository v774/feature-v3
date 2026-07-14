import { AnimatedText } from "../../components/AnimatedText/AnimatedText";
import { ContactButton } from "../../components/ContactButton/ContactButton";
import { homepageContent, type AboutDecorationContent } from "../../content/homepageContent";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useCallback, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { useSectionAnimation } from "../../hooks/useSectionAnimation";
import { premiumEase } from "../../utils/motionConfig";
import "./AboutSection.css";

function AboutDecoration({
  decoration,
  scrollProgress,
}: {
  decoration: AboutDecorationContent;
  scrollProgress: MotionValue<number>;
}) {
  const x = useTransform(scrollProgress, [0, 0.34, 0.66, 1], [decoration.spreadX, 0, 0, decoration.spreadX]);
  const y = useTransform(scrollProgress, [0, 0.34, 0.66, 1], [decoration.spreadY, 0, 0, decoration.spreadY]);
  const opacity = useTransform(scrollProgress, [0, 0.28, 0.72, 1], [0.28, 1, 1, 0.28]);
  const scale = useTransform(scrollProgress, [0, 0.34, 0.66, 1], [0.86, 1, 1, 0.86]);

  return (
    <motion.div className={decoration.className} style={{ x, y, opacity, scale }}>
      <img src={decoration.src} alt="" loading="lazy" decoding="async" />
    </motion.div>
  );
}

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {
    setRef: setSectionAnimationRef,
    controls: sectionControls,
    initial: sectionInitial,
  } = useSectionAnimation<HTMLElement>();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const setAboutSectionRef = useCallback((element: HTMLElement | null) => {
    sectionRef.current = element;
    setSectionAnimationRef(element);
  }, [setSectionAnimationRef]);

  return (
    <section
      id="about"
      className="about-section"
      ref={setAboutSectionRef}
    >
      {homepageContent.about.decorations.map((decoration) => (
        <AboutDecoration
          key={decoration.src}
          decoration={decoration}
          scrollProgress={scrollYProgress}
        />
      ))}
      <div className="about-content">
        <motion.div
          initial={sectionInitial}
          animate={sectionControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: premiumEase }}
        >
          <h2 className="about-heading gradient-heading">{homepageContent.about.heading}</h2>
        </motion.div>
        <AnimatedText text={homepageContent.about.text} className="about-text" />
        <div className="about-button-row">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
