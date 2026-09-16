import { siteContent } from "./siteContent";

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ШЛЯХИ ДО ФАЙЛІВ
   Якщо поміняєш шлях - відео не завантажиться
   ========================================================================== */
const heroVideoSrc = new URL("/videos/hero/neon-lama.mp4", import.meta.url).href;

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТИПИ ДАНИХ
   Це структура. Зміна назв полів зламає компоненти Hero/About/Services
   ========================================================================== */
export interface ServiceContent {
  number: string;        // 🚫 НЕ ЧІПАТИ - номер "01"
  title: string;         // ✅ МОЖНА - назва послуги
  description: string;   // ✅ МОЖНА - опис послуги
}

export interface AboutDecorationContent {
  className: string;     // 🚫 НЕ ЧІПАТИ - клас для позиції
  src: string;           // ✅ МОЖНА - шлях до картинки
  spreadX: number;       // ⚠️ ОБЕРЕЖНО - напрямок анімації по X
  spreadY: number;       // ⚠️ ОБЕРЕЖНО - напрямок анімації по Y
}

export interface HomepageContent {
  hero: {
    brand: string;
    kicker: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    availability: string;
    location: string;
    highlights: string[];
    localVideoSrc: string;
    posterSrc: string;
    desktopSequence: {
      basePath: string;
      filePrefix: string;
      extension: string;
      frameCount: number;
      framePadding: number;
    };
    watermark: string;
    highlightsAriaLabel: string;
  };
  marquee: { ariaLabel: string; };
  about: {
    eyebrow: string;
    heading: string;
    text: string;
    cta: string;
    decorations: AboutDecorationContent[];
  };
  services: {
    heading: string;
    items: ServiceContent[];
  };
  projects: {
    heading: string;
    description: string;
    liveProjectLabel: string;
  };
}

/* ==========================================================================
   ✅ АДМІНКА ГОЛОВНОЇ - ТУТ МІНЯЄШ ВСЕ
   ========================================================================== */
export const homepageContent: HomepageContent = {
  
  // [STRIPPED 68 bytes] ✅ HERO - ПЕРШИЙ ЕКРАН
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  hero: {
    brand: siteContent.brandName, // 🚫 НЕ ЧІПАТИ - тягнеться з siteContent.ts

    // --- Тексти ---
    kicker: "Motion designer", // ✅ Підпис над заголовком
    headline: "I bring brands\nto life through motion.", // ✅ Головний заголовок (\n = новий рядок)
    description: "I design premium logo animations and brand motion systems that make businesses unforgettable.", // ✅ Опис
    primaryCta: "View my work", // ✅ Кнопка 1
    secondaryCta: "Watch showreel", // ✅ Кнопка 2
    availability: "Available for new projects", // ✅ Статус доступності
    location: "Worldwide", // ✅ Локація
    highlights: ["Logo Animation", "Brand Motion", "Lottie UI"], // ✅ Бейджі під описом (макс 3)

    // --- Медіа ---
    localVideoSrc: heroVideoSrc, // 🚫 НЕ ЧІПАТИ - шлях до відео hero
    posterSrc: "/images/hero/heroSequence/neon-llama-ishodnik_00000.webp", // ✅ Постер поки грузиться відео

    // --- Покадрова анімація для десктопа ---
    desktopSequence: {
      basePath: "/images/hero/heroSequence", // ✅ Папка з кадрами
      filePrefix: "neon-llama-ishodnik_", // ✅ Префікс файлів
      extension: "webp", // ✅ Розширення
      frameCount: 121, // ✅ Кількість кадрів (міняй якщо додав кадрів)
      framePadding: 5, // 🚫 НЕ ЧІПАТИ - кількість цифр (00001)
    },

    watermark: "VL MOTION", // ✅ Водяний знак на відео
    highlightsAriaLabel: "Portfolio highlights", // 🚫 НЕ ЧІПАТИ - для доступності
  },

  // [STRIPPED 68 bytes] ✅ РУХОМА СТРІЧКА
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  marquee: {
    ariaLabel: "Selected visual work", // 🚫 НЕ ЧІПАТИ - для скрінрідерів
  },

  // [STRIPPED 68 bytes] ✅ ABOUT - ПРО МЕНЕ
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  about: {
    eyebrow: "", // ✅ Маленький надпис (може бути пустим)
    heading: "ABOUT ME", // ✅ Заголовок
    text: "Hi, I’m Valentyn, a motion designer helping brands turn ideas into engaging visuals. I create logo animations, brand motion, animated icons, Lottie and social content. Need to make your brand stand out, explain a product or bring an idea to life? ", // ✅ Текст про тебе
    cta: "LET’S MAKE IT MOVE.", // ✅ Кнопка/заклик

    // Декоративні картинки навколо тексту
    decorations: [
      {
        className: "about-decoration about-decoration-top-left", // 🚫 НЕ ЧІПАТИ
        src: "/images/about/top-left.png", // ✅ Шлях до картинки
        spreadX: -180, // ⚠️ Куди летить при скролі X
        spreadY: -120, // ⚠️ Куди летить при скролі Y
      },
      {
        className: "about-decoration about-decoration-bottom-left",
        src: "/images/about/bottom-left.png",
        spreadX: -170,
        spreadY: 130,
      },
      {
        className: "about-decoration about-decoration-top-right",
        src: "/images/about/top-right.png",
        spreadX: 180,
        spreadY: -120,
      },
      {
        className: "about-decoration about-decoration-bottom-right",
        src: "/images/about/bottom-right.png",
        spreadX: 170,
        spreadY: 130,
      },
    ],
  },

  // [STRIPPED 68 bytes] ✅ SERVICES - ПОСЛУГИ
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  services: {
    heading: "Services", // ✅ Заголовок секції
    items: [
      {
        number: "01", // ✅ Номер (01, 02...)
        title: "Logo Animation", // ✅ Назва послуги
        description: "Custom logo reveals, intros and outros that make your brand feel polished, memorable and alive.", // ✅ Опис
      },
      {
        number: "02",
        title: "Lottie & UI",
        description: "Lightweight UI animations and micro-interactions that make apps, websites and digital products feel more engaging.",
      },
      {
        number: "03",
        title: "Icon Motion",
        description: "Smooth animated icon sets crafted for interfaces, brands and visual communication.",
      },
      {
        number: "04",
        title: "Social & Promo",
        description: "Dynamic motion content designed to grab attention across social media, events and campaigns.",
      },
    ],
  },

  // [STRIPPED 68 bytes] ✅ PROJECTS - ЗАГОЛОВОК СЕКЦІЇ РОБІТ
  // [STRIPPED 70 bytes] --------------------------------------------------------------------------------
  projects: {
    heading: "PROJECT", // ✅ Заголовок
    description: "A selection of Logo Animation, Lottie & UI, Icon Motion and Social & Promo projects.", // ✅ Опис
    liveProjectLabel: "Live Project", // ✅ Лейбл на картці
  },
};
