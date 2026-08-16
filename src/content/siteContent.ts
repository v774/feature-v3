/*
 * ТИПИ ГЛОБАЛЬНИХ ДАНИХ
 * Технічна частина. Назви полів не змінювати.
 */
export interface NavigationItemContent {
  id: string;
  label: string;
  icon?: string;
}

export interface SocialLinkContent {
  label: string;
  href: string;
  shortLabel?: string;
}

export interface SiteContent {
  siteName: string;
  brandName: string;
  brandShortName: string;
  brandSuffix: string;
  homeAriaLabel: string;
  navigationAriaLabel: string;
  sectionNavigationAriaLabel: string;
  navigation: NavigationItemContent[];
  bottomNavigation: NavigationItemContent[];
  contactCta: string;
  contactButtonLabel: string;
  footerTagline: string;
  footerSocialLabel: string;
  footerCopyright: string;
  email: string;
  socialLinks: SocialLinkContent[];
  /* Тексти сторінок категорій. */
  categoryPage: {
    back: string;
    work: string;
    projects: string;
    categoriesAriaLabel: string;
  };
  heroStatusPhrases: string[];
  /* Підписи у модальному вікні роботи. */
  modalLabels: {
    format: string;
    software: string;
    delivery: string;
    closeProject: string;
    selectedWork: string;
    watchProject: string;
  };
}

/*
 * ГЛОБАЛЬНА АДМІНКА САЙТУ
 *
 * Тут змінюються:
 * - назва бренду;
 * - меню;
 * - мобільна навігація;
 * - кнопки;
 * - footer;
 * - email;
 * - соціальні посилання;
 * - тексти модалки.
 */
export const siteContent: SiteContent = {
  siteName: "VL Motion",
  brandName: "VL Motion",
  brandShortName: "VL",
  brandSuffix: "motion",
  homeAriaLabel: "VL Motion home",
  navigationAriaLabel: "Main navigation",
  sectionNavigationAriaLabel: "Section navigation",
  /* Меню у верхній навігації. id має збігатися з id секції. */
  navigation: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
  /* Нижня мобільна навігація. */
  bottomNavigation: [
    { id: "home", label: "Home", icon: "home" },
    { id: "projects", label: "Work", icon: "work" },
    { id: "about", label: "About", icon: "about" },
    { id: "services", label: "Services", icon: "process" },
    { id: "contact", label: "Contact", icon: "contact" },
  ],
  contactCta: "Let's talk",
  contactButtonLabel: "Contact Me",
  footerTagline: "Logo animation · Brand motion · Lottie UI",
  footerSocialLabel: "Social links",
  footerCopyright: "© 2026 VALENTYN LAVRYK · MOTION DESIGNER",
  email: "valentyn.lvrk@gmail.com",
  /*
   * Соціальні посилання.
   * Нове посилання додається окремим об'єктом у цей масив.
   */
  socialLinks: [
    { label: "Email", href: "mailto:valentyn.lvrk@gmail.com", shortLabel: "Mail" },
  ],
  /* Тексти сторінок категорій. */
  categoryPage: {
    back: "Back",
    work: "Work",
    projects: "projects",
    categoriesAriaLabel: "Work categories",
  },
  /* Фрази статусу у Hero. */
  heroStatusPhrases: [
    "VL MOTION",
    "MOTION DESIGNER",
    "AVAILABLE WORLDWIDE",
    "NEW PROJECTS OPEN",
    "READY_",
  ],
  /* Підписи у модальному вікні роботи. */
  modalLabels: {
    format: "Format",
    software: "Software",
    delivery: "Delivery",
    closeProject: "Close project",
    selectedWork: "SELECTED WORK",
    watchProject: "Watch Project",
  },
};
