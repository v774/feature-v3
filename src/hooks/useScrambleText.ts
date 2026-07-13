import { useEffect, useState } from "react";

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~|}{[]:;?>";

const randomCharacter = () => characters[Math.floor(Math.random() * characters.length)] ?? "";

export function useScrambleText(text: string, delay = 0, triggered = true, revealStep = 0.5) {
  const [state, setState] = useState({ text: "", displayed: "", done: false });
  const displayed = triggered && state.text === text ? state.displayed : "";
  const done = triggered && state.text === text ? state.done : false;

  useEffect(() => {
    if (!triggered) {
      return undefined;
    }

    let intervalId: number | undefined;
    let revealPosition = 0;

    const delayId = window.setTimeout(() => {
      setState({ text, displayed: "", done: false });
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

        setState({ text, displayed: next, done: false });

        if (revealPosition >= text.length) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
          setState({ text, displayed: text, done: true });
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
