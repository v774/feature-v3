import { useEffect, useState } from "react";
import { homepageContent } from "../../content/homepageContent";
import { siteContent } from "../../content/siteContent";
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
        <a className="navbar-logo" href="/" aria-label={siteContent.homeAriaLabel}>
          <span className="navbar-logo-text">{siteContent.brandName}</span>
          <span className="navbar-logo-mark">{homepageContent.hero.kicker}</span>
        </a>

        <nav className="navbar-links" aria-label={siteContent.navigationAriaLabel}>
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
          {homepageContent.hero.primaryCta}
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
