import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import "./AnimatedText.css";

function AnimatedCharacter({ character, index, total, progress }: { character: string, index: number, total: number, progress: any }) {
  const start = total <= 1 ? 0 : index / total;
  const end = total <= 1 ? 1 : (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return <motion.span aria-hidden="true" style={{ opacity }}>{character}</motion.span>;
}

export function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: paragraphRef, offset: ["start 0.8", "end 0.2"] });
  const characters = Array.from(text);

  return (
    <p ref={paragraphRef} className={`animated-text ${className}`.trim()} aria-label={text}>
      <span className="animated-text-placeholder" aria-hidden="true">{text}</span>
      <span className="animated-text-characters">
        {characters.map((char, index) => (
          <AnimatedCharacter key={`${char}-${index}`} character={char} index={index} total={characters.length} progress={scrollYProgress} />
        ))}
      </span>
    </p>
  );
}