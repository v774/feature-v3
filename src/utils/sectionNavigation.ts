let pendingHomepageSection: string | null = null;

export function isHomepagePath(pathname: string) {
  return /^\/(?:en|ua|pl)?\/?$/.test(pathname);
}

export function getHomepagePath(pathname: string) {
  const locale = pathname.match(/^\/(en|ua|pl)(?:\/|$)/)?.[1];
  return locale? `/${locale}` : "/";
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

  // Перевіряємо, чи це мобільний пристрій (ширина екрана 900px і менше)
  const isMobile = window.innerWidth <= 900;

  // Для секції "contact" даємо -250 на десктопі і 0 на телефоні
  const offset = sectionId === "contact" ? (isMobile ? 0 : -250) : 0;

  window.scrollTo({
    top: section.getBoundingClientRect().top + window.scrollY - offset,
    left: 0,
    behavior: "smooth",
  });
}