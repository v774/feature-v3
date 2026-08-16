import { portfolioCategories, portfolioProjects } from "./portfolioContent";
import { siteContent } from "./siteContent";

/*
 * ТИПИ SEO
 * Технічна частина. Структуру не змінювати.
 */
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
  /*
   * Прев'ю посилання у соцмережах і месенджерах.
   * Файл повинен лежати у public/og-preview.jpg.
   */
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

/*
 * ГОЛОВНИЙ ДОМЕН САЙТУ
 * Після підключення власного домену змінюється тільки цей рядок.
 */
const baseUrl = "https://vportfolio-flame.vercel.app";

/*
 * SEO-АДМІНКА
 *
 * Тут змінюються:
 * - title і description;
 * - ключові слова;
 * - колір браузера;
 * - OG-картинка;
 * - SEO окремих маршрутів.
 */
export const seoContent: SeoContent = {
  siteName: siteContent.siteName,
  author: "Valentyn Lavryk",
  canonicalUrl: baseUrl,
  defaultTitle: "VL Motion | Motion Designer & Logo Animation",
  defaultDescription:
    "Motion designer creating premium logo animations, brand motion systems, Lottie animations and animated posters.",
  keywords: [
    "motion designer",
    "logo animation",
    "brand motion",
    "Lottie animation",
    "animated posters",
    "VL Motion",
  ],
  themeColor: "#08080a",
  /*
   * Прев'ю посилання у соцмережах і месенджерах.
   * Файл повинен лежати у public/og-preview.jpg.
   */
  openGraph: {
    type: "website",
    image: `${baseUrl}/og-preview.jpg`,
    imageWidth: "1200",
    imageHeight: "630",
    imageAlt: "VL Motion portfolio preview",
  },
  twitter: {
    card: "summary_large_image",
    image: `${baseUrl}/og-preview.jpg`,
  },
  /*
   * SEO головної та сторінок категорій.
   * Категорії формуються автоматично з portfolioContent.ts.
   */
  routes: {
    "/": {
      title: "VL Motion | Motion Designer & Logo Animation",
      description:
        "Premium logo animation, brand motion systems, Lottie animations and visual content for modern brands.",
      canonicalPath: "/",
    },
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
