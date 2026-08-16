/*
 * НАЛАШТУВАННЯ ТА ЗБИРАЧ ПОРТФОЛІО
 *
 * Тут редагуються:
 * - назви й описи категорій;
 * - порядок категорій;
 * - одна картинка категорії для секції PROJECT;
 * - showreel.
 *
 * Самі роботи лежать у папці projects.
 */

import { logoAnimationProjects } from "./projects/logoAnimations";
import { iconProjects } from "./projects/icons";
import { lottieUiProjects } from "./projects/lottieUi";
import { posterProjects } from "./projects/posters";

export interface PortfolioCategory {
  slug: string;
  label: string;
  description: string;
  enabled: boolean;
  size: "large" | "small" | "wide";
  order: number;

  /* Одна картинка категорії у великій секції PROJECT. */
  featuredImage: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  video: string;
  poster: string;
  showInMarquee: boolean;
  published: boolean;
  order: number;
  client: string;
  year: string;
  tools: string[];
  tags: string[];
  format: string;
  delivery: string;
  duration: string;
  seoTitle: string;
  seoDescription: string;
}

export interface CategoryProject {
  id: string;
  title: string;
  categorySlug: string;
  description: string;
  tags: string[];
  videoPath: string;
  previewImage: string;
  format: string;
  software: string;
  delivery: string;
  duration: string;
  enabled: boolean;
}

/*
 * Цей формат залишено тільки для сумісності
 * з чинним компонентом ProjectsSection.
 */
export interface PortfolioProjectImages {
  leftTop: string;
  leftBottom: string;
  right: string;
}

export interface FeaturedHomepageProject {
  number: string;
  name: string;
  category: string;
  description: string;
  href: string;
  images: PortfolioProjectImages;
}

export interface MarqueeProject {
  id: string;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  href?: string;
  alt: string;
}

/* ================= НАЛАШТУВАННЯ КАТЕГОРІЙ ================= */
export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "logo-animation",
    label: "Logo Animation",
    description:
      "Custom logo reveals, intros and brand animations built around the character of each identity.",
    enabled: true,
    size: "large",
    order: 1,
    featuredImage: "/images/projects/1.webp",
  },
  {
    slug: "icons",
    label: "Icons",
    description:
      "Animated icon sets crafted for interfaces, brands and visual communication.",
    enabled: true,
    size: "small",
    order: 2,
    featuredImage: "/images/projects/3.webp",
  },
  {
    slug: "lottie-ui",
    label: "Lottie UI",
    description:
      "Lightweight interface motion and micro-interactions designed for apps, websites and digital products.",
    enabled: true,
    size: "small",
    order: 3,
    featuredImage: "/images/projects/4.webp",
  },
  {
    slug: "posters",
    label: "Posters",
    description:
      "Animated posters created for music, events, campaigns and social content.",
    enabled: true,
    size: "wide",
    order: 4,
    featuredImage: "/images/projects/2.webp",
  },
];

/* Усі роботи з чотирьох окремих файлів. */
export const portfolioProjects: PortfolioProject[] = [
  ...logoAnimationProjects,
  ...iconProjects,
  ...lottieUiProjects,
  ...posterProjects,
];

/* ================= SHOWREEL ================= */
export const showreelProject: CategoryProject = {
  id: "showreel",
  title: "Brand motion showreel",
  categorySlug: "showreel",
  description:
    "A selection of logo animation, brand motion systems and visual content.",
  tags: ["Showreel", "Motion Design"],
  videoPath: "/videos/showreel/main-showreel.webm",
  previewImage: "",
  format: "WEBM",
  software: "After Effects",
  delivery: "Digital",
  duration: "01:28",
  enabled: true,
};

/* ================= ТЕХНІЧНІ ЗБИРАЧІ ================= */

export const categories = portfolioCategories
  .filter((category) => category.enabled)
  .sort((a, b) => a.order - b.order)
  .map(({ slug, enabled, size }) => ({ slug, enabled, size }));

export const projects: CategoryProject[] = portfolioProjects
  .filter((project) => project.published)
  .sort((a, b) => a.order - b.order)
  .map((project) => ({
    id: project.id,
    title: project.title,
    categorySlug: project.category,
    description: project.description,
    tags: project.tags,
    videoPath: project.video,
    previewImage: project.thumbnail,
    format: project.format,
    software: project.tools.join(", "),
    delivery: project.delivery,
    duration: project.duration,
    enabled: project.published,
  }));

/*
 * Для адмінки в категорії задається одна featuredImage.
 * Старому компоненту автоматично віддається сумісний images-об'єкт.
 */
export const featuredHomepageProjects: FeaturedHomepageProject[] =
  portfolioCategories
    .filter((category) => category.enabled)
    .sort((a, b) => a.order - b.order)
    .map((category, index) => ({
      number: String(index + 1).padStart(2, "0"),
      name: category.label,
      category: category.label,
      description: category.description,
      href: `/work/${category.slug}`,
      images: {
        leftTop: category.featuredImage,
        leftBottom: category.featuredImage,
        right: category.featuredImage,
      },
    }));

/*
 * Один проєкт створює один елемент стрічки:
 * є video — показуємо відео;
 * video порожнє — показуємо thumbnail.
 */
export const marqueeProjects: MarqueeProject[] = portfolioProjects
  .filter((project) => project.published && project.showInMarquee)
  .sort((a, b) => a.order - b.order)
  .map((project) => {
    if (project.video.trim()) {
      return {
        id: `${project.id}-video`,
        title: project.title,
        category: project.category,
        type: "video" as const,
        src: project.video,
        poster: project.poster,
        href: `/work/${project.category}`,
        alt: `${project.title} motion preview`,
      };
    }

    return {
      id: `${project.id}-poster`,
      title: project.title,
      category: project.category,
      type: "image" as const,
      src: project.thumbnail,
      href: `/work/${project.category}`,
      alt: `${project.title} poster`,
    };
  });
