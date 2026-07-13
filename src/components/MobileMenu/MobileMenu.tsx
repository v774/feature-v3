import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navigationItems } from "../../data/navigationData";
import "./MobileMenu.css";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-menu mobile-menu--open"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="mobile-menu-nav" aria-label="Mobile navigation">
            {navigationItems.map((item) => (
              <a className="mobile-menu-link" href={item.href} key={item.label} onClick={onClose}>
                {item.label}
              </a>
            ))}
            <a className="mobile-menu-contact" href="/" onClick={onClose}>
              View work
            </a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
