let pendingHomepageSection: string | null = null;

export function isHomepagePath(pathname: string) {
  return /^\/(?:en|ua|pl)?\/?$/.test(pathname);
}

export function getHomepagePath(pathname: string) {
  const locale = pathname.match(/^\/(en|ua|pl)(?:\/|$)/)?.[1];
  return locale ? `/${locale}` : "/";
}

export function setPendingHomepageSection(sectionId: string) {
  pendingHomepageSection = sectionId;
}

export function consumePendingHomepageSection() {
  const sectionId = pendingHomepageSection;
  pendingHomepageSection = null;
  return sectionId;
}

export function scrollToHomepageSection(sectionId: string) {
  const section = document.getElementById(sectionId);
  if (!section) return;
  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY,
    left: 0,
    behavior: "smooth",
  });
}
