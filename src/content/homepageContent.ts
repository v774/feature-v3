import { siteContent } from "./siteContent";

/*
 * ВІДЕО HERO
 * Тут задається локальний файл відео першого екрана.
 * Шлях імпорту залишай у такому форматі.
 */
const heroVideoSrc = new URL("../assets/videos/hero/neon-lama.mp4", import.meta.url).href;

/*
 * ТИПИ ДАНИХ
 * Це технічна частина. Назви полів краще не змінювати,
 * бо їх очікують компоненти сайту.
 */
export interface ServiceContent {
  number: string;
  title: string;
  description: string;
}

export interface AboutDecorationContent {
  className: string;
  src: string;
  spreadX: number;
  spreadY: number;
}

export interface HomepageContent {
  /* ================= HERO ================= */
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
    /*
     * Покадрова секвенція для desktop.
     * frameCount — кількість кадрів.
     * framePadding — кількість цифр у назві кадру.
     */
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
  /* ============== РУХОМА СТРІЧКА ============== */
  marquee: {
    ariaLabel: string;
  };
  /* ================= ABOUT ================= */
  about: {
    eyebrow: string;
    heading: string;
    text: string;
    cta: string;
    decorations: AboutDecorationContent[];
  };
  /* ================ SERVICES ================ */
  services: {
    heading: string;
    items: ServiceContent[];
  };
  /*
   * ================= PROJECT =================
   * Тут тільки заголовок та опис секції.
   * Самі категорії та роботи лежать у portfolioContent.ts.
   */
  projects: {
    heading: string;
    description: string;
    liveProjectLabel: string;
  };
}

/*
 * АДМІНКА ГОЛОВНОЇ СТОРІНКИ
 *
 * Тут можна безпечно змінювати тексти, шляхи до картинок,
 * відео, кількість послуг і декоративні елементи.
 * Структуру об'єкта та назви полів не змінюй.
 */
export const homepageContent: HomepageContent = {
  hero: {
    brand: siteContent.brandName,
    kicker: "Motion designer",
    headline: "I bring brands\nto life through motion.",
    description:
      "I design premium logo animations and brand motion systems that make businesses unforgettable.",
    primaryCta: "View my work",
    secondaryCta: "Watch showreel",
    availability: "Available for new projects",
    location: "Worldwide",
    highlights: ["Logo Animation", "Brand Motion", "Lottie UI"],
    /* Відео Hero. */
    localVideoSrc: heroVideoSrc,
    /* Статична картинка до завантаження відео або секвенції. */
    posterSrc: "/images/hero/heroSequence/neon-llama-ishodnik_00000.webp",
    /*
     * Покадрова секвенція для desktop.
     * frameCount — кількість кадрів.
     * framePadding — кількість цифр у назві кадру.
     */
    desktopSequence: {
      basePath: "/images/hero/heroSequence",
      filePrefix: "neon-llama-ishodnik_",
      extension: "webp",
      frameCount: 121,
      framePadding: 5,
    },
    watermark: "VL MOTION",
    highlightsAriaLabel: "Portfolio highlights",
  },
  /* ============== РУХОМА СТРІЧКА ============== */
  marquee: {
    ariaLabel: "Selected visual work",
  },
  /* ================= ABOUT ================= */
  about: {
    eyebrow: "",
    heading: "ABOUT ME",
    text:
      "I’m Valentyn, a motion designer creating polished logo animations, brand motion, animated icons, Lottie interactions and social content. I focus on clear ideas, precise timing and visuals that help brands feel more memorable.",
    cta: "LET’S WORK TOGETHER",
    /*
     * Декоративні картинки секції About.
     * src — шлях до картинки.
     * spreadX / spreadY — напрямок руху в анімації.
     */
    decorations: [
      {
        className: "about-decoration about-decoration-top-left",
        src: "/images/about/top-left.png",
        spreadX: -180,
        spreadY: -120,
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
  /* ================ SERVICES ================ */
  services: {
    heading: "Services",
    items: [
      {
        number: "01",
        title: "Logo Animation",
        description:
          "Custom logo reveals, intros and outros designed to make your brand feel polished, memorable and alive.",
      },
 
      {
        number: "02",
        title: "Lottie & UI",
        description:
          "Lightweight interface animations, micro-interactions and animated elements for apps, websites and digital products.",
      },
      {
        number: "03",
        title: "Animated Icons",
        description:
          "Smooth animated icon sets created for interfaces, presentations, products and social media.",
      },
      {
        number: "04",
        title: "Animated Posters",
        description:
          "Bold animated posters for music, events, campaigns and social platforms.",
      },
    ],
  },
  /*
   * ================= PROJECT =================
   * Тут тільки заголовок та опис секції.
   * Самі категорії та роботи лежать у portfolioContent.ts.
   */
  projects: {
    heading: "PROJECT",
    description: "A selection of logo animation, Lottie, icon motion and animated poster projects.",
    liveProjectLabel: "Live Project",
  },
};
