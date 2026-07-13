import { AnimatedText } from "../../components/AnimatedText/AnimatedText";
import { ContactButton } from "../../components/ContactButton/ContactButton";
import { FadeIn } from "../../components/FadeIn/FadeIn";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import "./AboutSection.css";

const aboutText =
  "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!";

const decorations = [
  {
    className: "about-decoration about-decoration-top-left",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png",
    spreadX: -180,
    spreadY: -120,
  },
  {
    className: "about-decoration about-decoration-bottom-left",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png",
    spreadX: -170,
    spreadY: 130,
  },
  {
    className: "about-decoration about-decoration-top-right",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png",
    spreadX: 180,
    spreadY: -120,
  },
  {
    className: "about-decoration about-decoration-bottom-right",
    src: "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png",
    spreadX: 170,
    spreadY: 130,
  },
];

type AboutDecorationData = (typeof decorations)[number];

function AboutDecoration({
  decoration,
  scrollProgress,
}: {
  decoration: AboutDecorationData;
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
      {decorations.map((decoration) => (
        <AboutDecoration
          key={decoration.src}
          decoration={decoration}
          scrollProgress={scrollYProgress}
        />
      ))}
      <div className="about-content">
        <FadeIn>
          <h2 className="about-heading gradient-heading">About me</h2>
        </FadeIn>
        <AnimatedText text={aboutText} className="about-text" />
        <div className="about-button-row">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}
