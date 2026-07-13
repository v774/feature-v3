import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getHomepagePath,
  isHomepagePath,
  scrollToHomepageSection,
  setPendingHomepageSection,
} from "../../utils/sectionNavigation";
import "./header.block.css";

const navigation = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Work" },
  { id: "contact", label: "Contact" },
];

export function Header() {
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const homePath = getHomepagePath(location.pathname);

  useEffect(() => {
    let previous = window.scrollY;
    const onScroll = () => {
      const current = window.scrollY;
      setHidden(current > 120 && current > previous);
      previous = current;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
        className={`header-component-wrapper__header${hidden ? " header-component-wrapper__header--hidden" : ""}`}
      >
        <div className="header-component-wrapper__container">
          <Link
            className="header-component-wrapper__logo"
            to={homePath}
            onClick={(event) => handleSectionClick(event, "home")}
            aria-label="VL Motion home"
          >
            <b>VL</b>
            <span>motion</span>
          </Link>
          <nav className="header-component-wrapper__navigation" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                className="header-component-wrapper__navigation-link"
                key={item.id}
                to={homePath}
                onClick={(event) => handleSectionClick(event, item.id)}
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
              Let's talk <span aria-hidden="true">&#8599;</span>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
