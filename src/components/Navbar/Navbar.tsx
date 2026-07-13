import { useEffect, useState } from "react";
import { navigationItems } from "../../data/navigationData";
import { MobileMenu } from "../MobileMenu/MobileMenu";
import "./Navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) {
        setMenuOpen(false);
      }
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <header className="navbar">
        <a className="navbar-logo" href="/" aria-label="VL Motion home">
          <span className="navbar-logo-text">VL Motion</span>
          <span className="navbar-logo-mark">Motion Designer</span>
        </a>

        <nav className="navbar-links" aria-label="Main navigation">
          {navigationItems.map((item, index) => (
            <span className="navbar-link-group" key={item.label}>
              <a className="navbar-link" href={item.href}>
                {item.label}
              </a>
              {index < navigationItems.length - 1 && (
                <span className="navbar-separator">,&nbsp;</span>
              )}
            </span>
          ))}
        </nav>

        <a className="navbar-contact" href="/">
          View work
        </a>

        <button
          className={`mobile-menu-button${menuOpen ? " mobile-menu-button--open" : ""}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
