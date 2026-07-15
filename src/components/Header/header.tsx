import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getHomepagePath,
  isHomepagePath,
  scrollToHomepageSection,
  setPendingHomepageSection,
} from "../../utils/sectionNavigation";
import { siteContent } from "../../content/siteContent";
import "./header.block.css";

export function Header() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const homePath = getHomepagePath(location.pathname);
  const isHomeRoute = isHomepagePath(location.pathname);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 24);
      setHidden(current > 120 && current > previous);
      previous = current;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomeRoute) return;

    const sectionIds = siteContent.navigation.map((item) => item.id);
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.18, 0.35, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHomeRoute]);

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    if (isHomepagePath(location.pathname)) {
      scrollToHomepageSection(sectionId);
      return;
    }
    setPendingHomepageSection(sectionId);
    navigate(homePath);
  };

  return (
    <div className="header-component-wrapper">
      <header
        className={[
          "header-component-wrapper__header",
          hidden ? "header-component-wrapper__header--hidden" : "",
          scrolled ? "header-component-wrapper__header--scrolled" : "",
        ].filter(Boolean).join(" ")}
      >
        <div className="header-component-wrapper__container">
          <Link
            className="header-component-wrapper__logo"
            to={homePath}
            onClick={(event) => handleSectionClick(event, "home")}
            aria-label={siteContent.homeAriaLabel}
          >
            <b>{siteContent.brandShortName}</b>
            <span>{siteContent.brandSuffix}</span>
          </Link>
          <nav className="header-component-wrapper__navigation" aria-label={siteContent.navigationAriaLabel}>
            {siteContent.navigation.map((item) => (
              <Link
                className={[
                  "header-component-wrapper__navigation-link",
                  isHomeRoute && activeSection === item.id ? "header-component-wrapper__navigation-link--active" : "",
                ].filter(Boolean).join(" ")}
                key={item.id}
                to={homePath}
                onClick={(event) => handleSectionClick(event, item.id)}
                aria-current={isHomeRoute && activeSection === item.id ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="header-component-wrapper__actions">
            <Link
              className="header-component-wrapper__contact-button"
              to={homePath}
              onClick={(event) => handleSectionClick(event, "contact")}
            >
              {siteContent.contactCta} <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
