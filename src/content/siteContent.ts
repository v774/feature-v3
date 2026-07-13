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
  categoryPage: {
    back: string;
    work: string;
    projects: string;
    categoriesAriaLabel: string;
  };
  heroStatusPhrases: string[];
  modalLabels: {
    format: string;
    software: string;
    delivery: string;
    closeProject: string;
    selectedWork: string;
    watchProject: string;
  };
}

export const siteContent: SiteContent = {
  siteName: "VL Motion",
  brandName: "VL Motion",
  brandShortName: "VL",
  brandSuffix: "motion",
  homeAriaLabel: "VL Motion home",
  navigationAriaLabel: "Main navigation",
  sectionNavigationAriaLabel: "Section navigation",
  navigation: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
  bottomNavigation: [
    { id: "home", label: "Home", icon: "home" },
    { id: "projects", label: "Work", icon: "work" },
    { id: "about", label: "About", icon: "about" },
    { id: "services", label: "Services", icon: "process" },
    { id: "contact", label: "Contact", icon: "contact" },
  ],
  contactCta: "Let's talk",
  contactButtonLabel: "Contact Me",
  footerTagline: "Motion design portfolio foundation.",
  footerSocialLabel: "Social links",
  footerCopyright: "© 2026 VALENTYN LAVRYK · MOTION DESIGNER",
  email: "hello@example.com",
  socialLinks: [
    { label: "Behance", href: "https://behance.net", shortLabel: "Be" },
    { label: "Instagram", href: "https://instagram.com", shortLabel: "Ig" },
    { label: "Email", href: "mailto:hello@example.com", shortLabel: "Mail" },
  ],
  categoryPage: {
    back: "Back",
    work: "Work",
    projects: "projects",
    categoriesAriaLabel: "Work categories",
  },
  heroStatusPhrases: [
    "VL MOTION",
    "MOTION DESIGNER",
    "AVAILABLE WORLDWIDE",
    "NEW PROJECTS OPEN",
    "READY_",
  ],
  modalLabels: {
    format: "Format",
    software: "Software",
    delivery: "Delivery",
    closeProject: "Close project",
    selectedWork: "SELECTED WORK",
    watchProject: "Watch Project",
  },
};
