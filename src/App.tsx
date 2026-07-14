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
import { portfolioCategories, showreelProject } from "./content/portfolioContent";
import { seoContent } from "./content/seoContent";
import { consumePendingHomepageSection, isHomepagePath } from "./utils/sectionNavigation";

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

function setMetaAttribute(selector: string, attribute: "content" | "href", value: string) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
}

function SeoManager() {
  const location = useLocation();

  useEffect(() => {
    const routePath = location.pathname || "/";
    const routeSeo = seoContent.routes[routePath] ?? seoContent.routes["/"];
    const title = routeSeo.title;
    const description = routeSeo.description;
    const canonicalUrl = `${seoContent.canonicalUrl}${routeSeo.canonicalPath === "/" ? "/" : routeSeo.canonicalPath}`;
    const ogImage = routeSeo.ogImage
      ? `${seoContent.canonicalUrl}${routeSeo.ogImage}`
      : seoContent.openGraph.image;

    document.title = title;
    setMetaAttribute('meta[name="description"]', "content", description);
    setMetaAttribute('meta[name="keywords"]', "content", seoContent.keywords.join(", "));
    setMetaAttribute('meta[name="author"]', "content", seoContent.author);
    setMetaAttribute('meta[name="theme-color"]', "content", seoContent.themeColor);
    setMetaAttribute('link[rel="canonical"]', "href", canonicalUrl);
    setMetaAttribute('meta[property="og:title"]', "content", title);
    setMetaAttribute('meta[property="og:description"]', "content", description);
    setMetaAttribute('meta[property="og:type"]', "content", seoContent.openGraph.type);
    setMetaAttribute('meta[property="og:url"]', "content", canonicalUrl);
    setMetaAttribute('meta[property="og:image"]', "content", ogImage);
    setMetaAttribute('meta[property="og:image:width"]', "content", seoContent.openGraph.imageWidth);
    setMetaAttribute('meta[property="og:image:height"]', "content", seoContent.openGraph.imageHeight);
    setMetaAttribute('meta[property="og:image:alt"]', "content", seoContent.openGraph.imageAlt);
    setMetaAttribute('meta[property="og:site_name"]', "content", seoContent.siteName);
    setMetaAttribute('meta[name="twitter:card"]', "content", seoContent.twitter.card);
    setMetaAttribute('meta[name="twitter:title"]', "content", title);
    setMetaAttribute('meta[name="twitter:description"]', "content", description);
    setMetaAttribute('meta[name="twitter:image"]', "content", ogImage);
  }, [location.pathname]);

  return null;
}

function AppRoutes() {
  const { pathname } = useLocation();
  const categoryPattern = portfolioCategories.map((category) => category.slug).join("|");
  const isValidRoute =
    new RegExp(`^/(?:$|work/[^/]+/?$|(?:${categoryPattern})/?$)`).test(
      pathname,
    );

  return (
    <>
      <SeoManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:categoryId" element={<CategoryPage />} />
        <Route path="/logo-animation" element={<Navigate to="/work/logo-animation" replace />} />
        <Route path="/icons" element={<Navigate to="/work/icons" replace />} />
        <Route path="/lottie-ui" element={<Navigate to="/work/lottie-ui" replace />} />
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
