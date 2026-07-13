import { AnimatedText } from "../../components/AnimatedText/AnimatedText";
import { ContactButton } from "../../components/ContactButton/ContactButton";
import { FadeIn } from "../../components/FadeIn/FadeIn";
import { homepageContent, type AboutDecorationContent } from "../../content/homepageContent";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
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
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      {homepageContent.about.decorations.map((decoration) => (
        <AboutDecoration
          key={decoration.src}
          decoration={decoration}
          scrollProgress={scrollYProgress}
        />
      ))}
      <div className="about-content">
        <FadeIn>
          <h2 className="about-heading gradient-heading">{homepageContent.about.heading}</h2>
        </FadeIn>
        <AnimatedText text={homepageContent.about.text} className="about-text" />
        <div className="about-button-row">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
