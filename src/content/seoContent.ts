import { portfolioCategories, portfolioProjects } from "./portfolioContent";
import { siteContent } from "./siteContent";

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТИПИ SEO
   Структура для Google. Назви не міняти
   ========================================================================== */
export interface RouteSeoContent {
  title: string;
  description: string;
  canonicalPath: string;
  ogImage?: string;
}

export interface SeoContent {
  siteName: string;
  author: string;
  canonicalUrl: string;
  defaultTitle: string;
  defaultDescription: string;
  keywords: string[];
  themeColor: string;
  openGraph: {
    type: string;
    image: string;
    imageWidth: string;
    imageHeight: string;
    imageAlt: string;
  };
  twitter: {
    card: string;
    image: string;
  };
  routes: Record<string, RouteSeoContent>;
}

/* ==========================================================================
   ✅ АДМІНКА - ГОЛОВНИЙ ДОМЕН
   Після підключення свого домену міняєш ТІЛЬКИ цей рядок
   ========================================================================== */
const baseUrl = "https://vportfolio-flame.vercel.app"; // ✅ ТУТ ТВІЙ ДОМЕН (без / в кінці)

/* ==========================================================================
   ✅ АДМІНКА - SEO
   Тут міняєш те що бачить Google і прев'ю в Telegram/FB
   ========================================================================== */
export const seoContent: SeoContent = {
  siteName: siteContent.siteName, // 🚫 НЕ ЧІПАТИ - тягнеться з siteContent
  author: "Valentyn Lavryk", // ✅ Автор (для Google)

  canonicalUrl: baseUrl, // 🚫 НЕ ЧІПАТИ - підставляється автоматично

  // --- Головні SEO ---
  defaultTitle: "VL Motion | Motion Designer & Logo Animation", // ✅ Title в браузері (головна)
  defaultDescription: "Motion designer creating premium logo animations, brand motion systems, Lottie animations and animated posters.", // ✅ Description для Google (150 символів)
  keywords: [ // ✅ Ключові слова для Google
    "motion designer",
    "logo animation",
    "brand motion",
    "Lottie animation",
    "animated posters",
    "VL Motion",
  ],
  themeColor: "#08080a", // ✅ Колір браузера на мобілці (темний)

  // --- Прев'ю посилання (коли кидаєш сайт в ТГ/FB) ---
  openGraph: {
    type: "website", // 🚫 НЕ ЧІПАТИ
    image: `${baseUrl}/og-preview.jpg`, // ✅ Картинка прев'ю - має лежати в public/og-preview.jpg (1200x630)
    imageWidth: "1200", // 🚫 НЕ ЧІПАТИ
    imageHeight: "630", // 🚫 НЕ ЧІПАТИ
    imageAlt: "VL Motion portfolio preview", // ✅ Опис картинки
  },
  twitter: {
    card: "summary_large_image", // 🚫 НЕ ЧІПАТИ
    image: `${baseUrl}/og-preview.jpg`, // ✅ Та сама картинка
  },

  /* ==========================================================================
     🚫 НЕ ЧІПАТИ - SEO ОКРЕМИХ СТОРІНОК
     Генерується автоматично з portfolioContent.ts
     Хочеш поміняти SEO категорії - міняй в portfolioCategories
     ========================================================================== */
  routes: {
    "/": {
      title: "VL Motion | Motion Designer & Logo Animation",
      description: "Premium logo animation, brand motion systems, Lottie animations and visual content for modern brands.",
      canonicalPath: "/",
    },
    // Автоматично створює /work/logo-animation, /work/icon-motion і тд
    ...Object.fromEntries(
      portfolioCategories.map((category) => {
        const project = portfolioProjects.find((item) => item.category === category.slug);
        return [
          `/work/${category.slug}`,
          {
            title: `${category.label} | ${siteContent.siteName}`,
            description: project?.seoDescription ?? category.description,
            canonicalPath: `/work/${category.slug}`,
            ogImage: project?.thumbnail,
          },
        ];
      }),
    ),
  },
};
