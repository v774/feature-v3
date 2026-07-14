import { useEffect, useRef } from "react";

type BodyScrollStyles = {
  position: string;
  top: string;
  left: string;
  right: string;
  width: string;
  overflow: string;
  paddingRight: string;
};

export function useBodyScrollLock(locked: boolean) {
  const scrollYRef = useRef(0);
  const previousStylesRef = useRef<BodyScrollStyles | null>(null);

  useEffect(() => {
    if (!locked) return undefined;

    scrollYRef.current = window.scrollY;
    previousStylesRef.current = {
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      right: document.body.style.right,
      width: document.body.style.width,
      overflow: document.body.style.overflow,
      paddingRight: document.body.style.paddingRight,
    };

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      const previousStyles = previousStylesRef.current;
      if (previousStyles) {
        document.body.style.position = previousStyles.position;
        document.body.style.top = previousStyles.top;
        document.body.style.left = previousStyles.left;
        document.body.style.right = previousStyles.right;
        document.body.style.width = previousStyles.width;
        document.body.style.overflow = previousStyles.overflow;
        document.body.style.paddingRight = previousStyles.paddingRight;
      }
      window.scrollTo(0, scrollYRef.current);
      previousStylesRef.current = null;
    };
  }, [locked]);
}
