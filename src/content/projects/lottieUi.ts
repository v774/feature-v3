import type { PortfolioProject } from "../portfolioContent";

/*
 * LOTTIE UI - АДМІНКА
 * Тут тільки роботи категорії lottie-ui
 */

export const lottieUiProjects: PortfolioProject[] = [
  {
    // --- ТЕХНІЧНЕ ---
    id: "placeholder-flow-ui", // 🚫 Унікальний ID
    slug: "flow-ui", // 🚫 Слаг
    category: "lottie-ui", // 🚫 Має бути lottie-ui

    // --- КОНТЕНТ ---
    title: "Flow UI Interaction", // ✅ Назва
    description: "A lightweight interface interaction showing progress, feedback and completion states.", // ✅ Опис

    // --- МЕДІА ---
    thumbnail: "/images/projects/2.webp", // ✅ Картинка картки
    video: "", // ✅ Відео (коли буде)
    poster: "/images/projects/2.webp", // ✅ Постер

    // --- ПОКАЗ ---
    showInMarquee: false, // ✅ В бігучій стрічці?
    published: true, // ✅ На сайті?
    order: 1, // ✅ Порядок

    // --- МОДАЛКА ---
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "Lottie JSON",
    delivery: "App interaction",
    duration: "TBD",
    seoTitle: "Flow UI Interaction | VL Motion",
    seoDescription: "A lightweight interface interaction showing progress, feedback and completion states.",
  },
  {
    id: "placeholder-tempo-ui",
    slug: "tempo-ui",
    category: "lottie-ui",
    title: "Tempo Product Motion",
    description: "Purposeful product motion connecting interface states with smooth visual continuity.",
    thumbnail: "/images/projects/3.webp",
    video: "",
    poster: "/images/projects/3.webp",
    showInMarquee: false,
    published: true,
    order: 2,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "Lottie JSON",
    delivery: "Product UI",
    duration: "TBD",
    seoTitle: "Tempo Product Motion | VL Motion",
    seoDescription: "Purposeful product motion connecting interface states with smooth visual continuity.",
  },
  {
    id: "placeholder-path-ui",
    slug: "path-ui",
    category: "lottie-ui",
    title: "Path Onboarding Sequence",
    description: "A concise onboarding sequence designed to guide attention without slowing the experience.",
    thumbnail: "/images/projects/1.webp",
    video: "",
    poster: "/images/projects/1.webp",
    showInMarquee: false,
    published: true,
    order: 3,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "Lottie JSON",
    delivery: "Mobile app",
    duration: "TBD",
    seoTitle: "Path Onboarding Sequence | VL Motion",
    seoDescription: "A concise onboarding sequence designed to guide attention without slowing the experience.",
  }
];
