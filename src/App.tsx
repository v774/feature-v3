import "./App.css";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigationType } from "react-router-dom";
import { AboutSection } from "./sections/AboutSection/AboutSection";
import { BottomNavigation } from "./components/BottomNav/BottomNavigation";
import CategoryPage from "./components/CategoryPage/CategoryPage";
import { Contact } from "./components/Contact/contact";
import { Footer } from "./components/Footer/footer";
import { Header } from "./components/Header/header";
import { HeroSection } from "./sections/HeroSection/HeroSection";
import { MarqueeSection } from "./sections/MarqueeSection/MarqueeSection";
import { ProjectModal } from "./components/ProjectModal/ProjectModal";
import { ScrollTopButton } from "./components/ScrollTopButton/ScrollTopButton";
import { ProjectsSection } from "./sections/ProjectsSection/ProjectsSection";
import { ServicesSection } from "./sections/ServicesSection/ServicesSection";
import type { Project } from "./data/projects";
import { consumePendingHomepageSection, isHomepagePath } from "./utils/sectionNavigation";

const showreelProject: Project = {
  id: "showreel",
  title: "Brand motion showreel",
  categorySlug: "showreel",
  description: "A selection of logo animation, brand motion systems and visual content.",
  tags: ["Showreel", "Motion Design"],
  videoPath: "/videos/showreel/main-showreel.webm",
  previewImage: "",
  format: "WEBM",
  software: "After Effects",
  delivery: "Digital",
  duration: "01:28",
  enabled: true,
};

function HomePage() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  return (
    <>
      <Header />
      <main className="portfolio-page">
        <HeroSection onShowreel={() => setShowreelOpen(true)} />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <Contact />
      </main>
      <Footer />
      <ProjectModal
        key={showreelOpen ? showreelProject.id : "closed"}
        project={showreelOpen ? showreelProject : null}
        onClose={() => setShowreelOpen(false)}
      />
    </>
  );
}

function ScrollRestoration() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const isFirstScrollEffect = useRef(true);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto";
    }
  }, []);

  useEffect(() => {
    const isHomeRoute = isHomepagePath(location.pathname);
    const pendingSection = isHomeRoute && !isFirstScrollEffect.current
      ? consumePendingHomepageSection()
      : null;

    if (pendingSection) {
      const frame = window.requestAnimationFrame(() => {
        document.getElementById(pendingSection)?.scrollIntoView({ behavior: "smooth" });
      });

      return () => window.cancelAnimationFrame(frame);
    }

    const shouldRestoreBrowserScroll = navigationType === "POP" && (!isFirstScrollEffect.current || isHomeRoute);

    isFirstScrollEffect.current = false;

    if (shouldRestoreBrowserScroll) {
      return;
    }

    if (!isHomeRoute) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [location.pathname, navigationType]);

  return null;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const isValidRoute =
    /^\/(?:$|(?:en|ua|pl)\/?$|(?:(?:en|ua|pl)\/)?work\/[^/]+\/?$|(?:logo-animation|icons|brand-motion|lottie-ui|social-media|posters)\/?$)/.test(
      pathname,
    );

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<HomePage />} />
        <Route path="/ua" element={<HomePage />} />
        <Route path="/pl" element={<HomePage />} />
        <Route path="/work/:categoryId" element={<CategoryPage />} />
        <Route path="/en/work/:categoryId" element={<CategoryPage />} />
        <Route path="/ua/work/:categoryId" element={<CategoryPage />} />
        <Route path="/pl/work/:categoryId" element={<CategoryPage />} />
        <Route path="/logo-animation" element={<Navigate to="/work/logo-animation" replace />} />
        <Route path="/icons" element={<Navigate to="/work/icons" replace />} />
        <Route path="/brand-motion" element={<Navigate to="/work/brand-motion" replace />} />
        <Route path="/lottie-ui" element={<Navigate to="/work/lottie-ui" replace />} />
        <Route path="/social-content" element={<Navigate to="/work/social-media" replace />} />
        <Route path="/posters" element={<Navigate to="/work/posters" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {isValidRoute && <BottomNavigation />}
      {isValidRoute && <ScrollTopButton />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollRestoration />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
