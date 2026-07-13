import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./AnimatedText.css";

type AnimatedCharacterProps = {
  character: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function AnimatedCharacter({ character, index, total, progress }: AnimatedCharacterProps) {
  const start = total <= 1 ? 0 : index / total;
  const end = total <= 1 ? 1 : (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <motion.span aria-hidden="true" style={{ opacity }}>
      {character}
    </motion.span>
  );
}

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export function AnimatedText({ text, className }: AnimatedTextProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: paragraphRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const characters = Array.from(text);

  return (
    <p ref={paragraphRef} className={["animated-text", className].filter(Boolean).join(" ")} aria-label={text}>
      <span className="animated-text-placeholder" aria-hidden="true">
        {text}
      </span>
      <span className="animated-text-characters">
        {characters.map((character, index) => (
          <AnimatedCharacter
            key={`${character}-${index}`}
            character={character}
            index={index}
            total={characters.length}
            progress={scrollYProgress}
          />
        ))}
      </span>
    </p>
  );
}
