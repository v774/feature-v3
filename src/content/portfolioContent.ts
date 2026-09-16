import { logoAnimationProjects } from "./projects/logoAnimations";
import { iconProjects } from "./projects/icons";
import { lottieUiProjects } from "./projects/lottieUi";
import { posterProjects } from "./projects/posters";

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТИПИ КАТЕГОРІЙ І ПРОЄКТІВ
   Це структура. Зміна назв зламає сторінку Work
   ========================================================================== */
export interface PortfolioCategory {
  slug: string;            // 🚫 НЕ ЧІПАТИ - ID категорії (використовується в URL /work/slug)
  label: string;           // ✅ МОЖНА - назва категорії для клієнта
  description: string;     // ✅ МОЖНА - опис категорії
  enabled: boolean;        // ✅ МОЖНА - true = показувати, false = сховати
  size: "large" | "small" | "wide"; // ⚠️ ОБЕРЕЖНО - розмір картки в сітці
  order: number;           // ✅ МОЖНА - порядок (1 = перша)
  featuredImage: string;   // ✅ МОЖНА - одна картинка категорії в секції PROJECT
}

export interface PortfolioProject {
  id: string;              // 🚫 НЕ ЧІПАТИ
  slug: string;            // 🚫 НЕ ЧІПАТИ
  title: string;           // ✅ МОЖНА (але краще міняти в projects/*.ts)
  category: string;        // 🚫 НЕ ЧІПАТИ
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
  duration: number | string;
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
  duration: number | string;
  client?: string;
  year?: string;
  enabled: boolean;
}

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

/* ==========================================================================
   ✅ АДМІНКА - КАТЕГОРІЇ
   Тут міняєш назви, описи, картинки і порядок категорій
   ========================================================================== */
export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "logo-animation", // 🚫 НЕ МІНЯЙ - це URL /work/logo-animation
    label: "Logo Animation", // ✅ Назва на сайті
    description: "Custom logo reveals, intros and brand animations built around the character of each identity.", // ✅ Опис
    enabled: true, // ✅ true = показувати
    size: "large", // ⚠️ large = велика картка
    order: 1, // ✅ 1 = перша
    featuredImage: "/images/projects/logo_animation.webp", // ✅ Картинка в секції PROJECT (одна на категорію)
  },
  {
    slug: "icon-motion",
    label: "Icon Motion",
    description: "Animated icon sets crafted for interfaces, brands and visual communication.",
    enabled: false,
    size: "small",
    order: 2,
    featuredImage: "/images/projects/3.webp",
  },
  {
    slug: "lottie-ui",
    label: "Lottie & UI",
    description: "Lightweight interface motion and micro-interactions designed for apps, websites and digital products.",
    enabled: false,
    size: "small",
    order: 3,
    featuredImage: "/images/projects/4.webp",
  },
  {
    slug: "social-promo",
    label: "Social & Promo",
    description: "Dynamic animations for social media, events, and advertising campaigns.",
    enabled: true,
    size: "wide",
    order: 4,
    featuredImage: "/images/projects/2.webp",
  },
];

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ЗБИРАЧ ВСІХ РОБІТ
   Роботи додаються в папці /content/projects/*.ts
   Тут вони тільки збираються в один масив
   ========================================================================== */
export const portfolioProjects: PortfolioProject[] = [
  ...logoAnimationProjects,
  ...iconProjects,
  ...lottieUiProjects,
  ...posterProjects,
];

/* ==========================================================================
   ✅ АДМІНКА - SHOWREEL (головне відео)
   ========================================================================== */
export const showreelProject: CategoryProject = {
  id: "showreel", // 🚫 НЕ ЧІПАТИ
  title: "Brand motion showreel", // ✅ Назва шоурилу
  categorySlug: "showreel", // 🚫 НЕ ЧІПАТИ
  description: "A selection of logo animation, brand motion systems and visual content.", // ✅ Опис
  tags: ["Showreel", "Motion Design"], // ✅ Теги
  videoPath: "/videos/showreel/main-showreel.webm", // ✅ Шлях до відео шоурилу
  previewImage: "", // ✅ Постер (може бути пустим)
  format: "WEBM",
  software: "After Effects, Illustrator, Photoshop", // ✅ Софт
  delivery: "Digital",
  duration: "01:28", // ✅ Тривалість
  enabled: true, // ✅ Показувати чи ні
};

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТЕХНІЧНІ ЗБИРАЧІ ДЛЯ КОМПОНЕНТІВ
   Це магія для ProjectsSection і Marquee. Не чіпай якщо не впевнений
   ========================================================================== */

// Для сітки категорій на головній
export const categories = portfolioCategories
  .filter((category) => category.enabled)
  .sort((a, b) => a.order - b.order)
  .map(({ slug, enabled, size }) => ({ slug, enabled, size }));

// Для модалок і сторінок категорій
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

// Для секції PROJECT (великі картки)
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

// Для бігучої стрічки (marquee)
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
