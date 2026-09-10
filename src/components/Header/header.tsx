import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getHomepagePath, isHomepagePath, scrollToHomepageSection, setPendingHomepageSection } from "../../utils/sectionNavigation";
import { siteContent } from "../../content/siteContent";
import "./header.block.css";

export function Header() {
  const [state, setState] = useState({ hidden: false, scrolled: false, activeId: "home" });
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const homePath = getHomepagePath(pathname);
  const isHome = isHomepagePath(pathname);

  useEffect(() => {
    let prev = window.scrollY;
    const onScroll = () => {
      const curr = window.scrollY;
      setState(s => ({ ...s, scrolled: curr > 24, hidden: curr > 120 && curr > prev }));
      prev = curr;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setState(s => ({ ...s, activeId: visible.target.id }));
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.18, 0.35, 0.5] }
    );
    
    siteContent.navigation.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, [isHome]);

  const navClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    isHome ? scrollToHomepageSection(id) : (setPendingHomepageSection(id), navigate(homePath));
  };

  return (
    <div className="header-component-wrapper">
      <header className={`header-component-wrapper__header ${state.hidden ? "header-component-wrapper__header--hidden" : ""} ${state.scrolled ? "header-component-wrapper__header--scrolled" : ""}`.trim()}>
        <div className="header-component-wrapper__container">
          <Link className="header-component-wrapper__logo" to={homePath} onClick={(e) => navClick(e, "home")} aria-label={siteContent.homeAriaLabel}>
            <b>{siteContent.brandShortName}</b><span>{siteContent.brandSuffix}</span>
          </Link>
          <nav className="header-component-wrapper__navigation">
            {siteContent.navigation.map(({ id, label }) => (
              <Link key={id} className={`header-component-wrapper__navigation-link ${isHome && state.activeId === id ? "header-component-wrapper__navigation-link--active" : ""}`.trim()} to={homePath} onClick={(e) => navClick(e, id)}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="header-component-wrapper__actions">
            <Link className="header-component-wrapper__contact-button" to={homePath} onClick={(e) => navClick(e, "contact")}>
              {siteContent.contactCta} <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}