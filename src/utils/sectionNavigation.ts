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

  // Визначаємо відступ. Якщо це секція "contacts", піднімаємо на 100px вище (змініть число за потреби)
  const offset = sectionId === "contact" ? -300 : 0;

  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - offset,
    left: 0,
    behavior: "smooth",
  });

}
