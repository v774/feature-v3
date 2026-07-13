import { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?>";

const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)] ?? "";

export function useScrambleText(text: string, delay = 0, triggered = true, revealStep = 0.5) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    if (!triggered) {
      return undefined;
    }

    let intervalId: number | undefined;
    let revealPosition = 0;

    const delayId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        revealPosition += revealStep;
        const next = text
          .split("")
          .map((character, index) => {
            if (character === " " || character === "\n") return character;
            if (index < revealPosition) return character;
            if (index < revealPosition + 3) return randomCharacter();
            return "";
          })
          .join("");

        setDisplayed(next);

        if (revealPosition >= text.length) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
          setDisplayed(text);
          setDone(true);
        }
      }, 25);
    }, delay);

    return () => {
      window.clearTimeout(delayId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [delay, revealStep, text, triggered]);

  return { displayed, done };
}
