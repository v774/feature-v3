import { useEffect, useRef, useState } from "react";
import "./ScrollTopButton.css";

export function ScrollTopButton() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const updateVisibility = () => {
      const shouldBeVisible = window.scrollY > 420;
      if (visibleRef.current === shouldBeVisible) return;
      visibleRef.current = shouldBeVisible;
      setVisible(shouldBeVisible);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`scroll-top-button${visible ? " scroll-top-button--visible" : ""}`}
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </svg>
    </button>
  );
}
