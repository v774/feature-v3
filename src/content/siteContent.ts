/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТИПИ ГЛОБАЛЬНИХ ДАНИХ
   Це структура. Зміна назв зламає меню і футер
   ========================================================================== */
export interface NavigationItemContent {
  id: string;       // 🚫 НЕ ЧІПАТИ - має збігатися з id секції (home, about...)
  label: string;    // ✅ МОЖНА - назва в меню
  icon?: string;    // ⚠️ ОБЕРЕЖНО - іконка для мобільної навігації
}

export interface SocialLinkContent {
  label: string;       // ✅ МОЖНА - назва соцмережі
  href: string;        // ✅ МОЖНА - посилання
  shortLabel?: string; // ✅ МОЖНА - коротка назва (напр. Mail)
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
    duration: string;
    format: string;
    software: string;
    delivery: string;
    closeProject: string;
    selectedWork: string;
    watchProject: string;
  };
}

/* ==========================================================================
   ✅ ГОЛОВНА АДМІНКА САЙТУ - ТУТ 90% ВСЬОГО ЩО МІНЯЄШ
   ========================================================================== */
export const siteContent: SiteContent = {
  
  // [STRIPPED 68 bytes] ✅ БРЕНД
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  siteName: "VL Motion", // ✅ Назва сайту в SEO і заголовках
  brandName: "VL Motion", // ✅ Назва в хедері
  brandShortName: "VL", // ✅ Коротка в лого (VL)
  brandSuffix: "motion", // ✅ Суфікс лого (motion)

  // [STRIPPED 68 bytes] 🚫 НЕ ЧІПАТИ - ДЛЯ ДОСТУПНОСТІ (скрінрідери)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  homeAriaLabel: "VL Motion home",
  navigationAriaLabel: "Main navigation",
  sectionNavigationAriaLabel: "Section navigation",

  // [STRIPPED 68 bytes] ✅ ВЕРХНЄ МЕНЮ (ДЕСКТОП)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  // id має збігатися з id секції на головній: home, about, services, projects, contact
  navigation: [
    { id: "home", label: "Home" }, // ✅ Міняй label, id не чіпай
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Work" },
    { id: "contact", label: "Contact" },
  ],
  
  // [STRIPPED 68 bytes] ✅ НИЖНЄ МЕНЮ (МОБІЛКА)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  bottomNavigation: [
    { id: "home", label: "Home", icon: "home" }, // icon: home, work, about, process, contact
    { id: "projects", label: "Work", icon: "work" },
    { id: "about", label: "About", icon: "about" },
    { id: "services", label: "Services", icon: "process" },
    { id: "contact", label: "Contact", icon: "contact" },
  ],
  
  // [STRIPPED 68 bytes] ✅ КНОПКИ
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  contactCta: "Let's talk", // ✅ Кнопка в хедері
  contactButtonLabel: "Contact Me", // ✅ Магнітна кнопка на головній

  // [STRIPPED 68 bytes] ✅ ФУТЕР
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  footerTagline: "Logo animation · Brand motion · Lottie UI", // ✅ Під лого в футері
  footerSocialLabel: "Social links", // ✅ Заголовок соцмереж
  footerCopyright: "© 2026 VALENTYN LAVRYK · MOTION DESIGNER", // ✅ Копірайт

  // [STRIPPED 68 bytes] ✅ КОНТАКТИ
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  email: "valentyn.lvrk@gmail.com", // ✅ Головна пошта (тягнеться в contactContent)

  // Соцмережі - додаєш новий об'єкт в масив
  socialLinks: [
    { label: 'Fiverr', href: 'https://www.fiverr.com/design_by_vl' }, // ✅ label = назва, href = лінк
    { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01de24a72809cbfcb0?mp_source=share' },
    { label: 'Instagram', href: 'https://www.instagram.com/valentyn.motion' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@valentyn.motion' },
    { label: 'Telegram', href: 'https://t.me/valentyn_motion' },
    { label: "Email", href: "mailto:valentyn.lvrk@gmail.com", shortLabel: "Mail" },
  ],

  // [STRIPPED 68 bytes] ✅ СТОРІНКИ КАТЕГОРІЙ (/work/...)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  categoryPage: {
    back: "Back", // ✅ Кнопка назад
    work: "Work",
    projects: "projects",
    categoriesAriaLabel: "Work categories", // 🚫 НЕ ЧІПАТИ
  },

  // [STRIPPED 68 bytes] ✅ HERO - ФРАЗИ СТАТУСУ (що бігають)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  heroStatusPhrases: [
    "VL MOTION",
    "MOTION DESIGNER",
    "AVAILABLE WORLDWIDE",
    "NEW PROJECTS OPEN",
    "READY_",
  ],

  // [STRIPPED 68 bytes] ✅ МОДАЛКА ПРОЄКТУ (підписи)
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  modalLabels: {
    duration: "Duration", // ✅
    format: "Format",
    software: "Software",
    delivery: "Delivery",
    closeProject: "Close project",
    selectedWork: "SELECTED WORK",
    watchProject: "Watch Project",
  },
};
