/*
 * LOTTIE UI
 *
 * Тут тільки роботи цієї категорії.
 *
 * Для додавання відео зазвичай змінюєш:
 * - thumbnail — картинка картки;
 * - video — шлях до відео;
 * - poster — заставка відео;
 * - showInMarquee — показ у рухомій стрічці;
 * - published — показ роботи на сайті;
 * - order — порядок у цій категорії: 1, 2, 3...
 *
 * Картинка великої секції PROJECT задається окремо
 * у portfolioContent.ts в налаштуваннях категорій.
 */

import type { PortfolioProject } from "../portfolioContent";

export const lottieUiProjects: PortfolioProject[] = [
  {
      id: "placeholder-flow-ui",
      slug: "flow-ui",
      title: "Flow UI Interaction",
      category: "lottie-ui",
      description: "A lightweight interface interaction showing progress, feedback and completion states.",
  
      /* Картинка картки. */
      thumbnail: "/images/projects/2.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "",
  
      /* Заставка відео. */
      poster: "/images/projects/2.webp",
  
      /* true = показувати у рухомій стрічці. */
      showInMarquee: false,
  
      /* true = показувати картку на сайті. */
      published: true,
  
      /* Порядок усередині цієї категорії. */
      order: 1,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
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
      title: "Tempo Product Motion",
      category: "lottie-ui",
      description: "Purposeful product motion connecting interface states with smooth visual continuity.",
  
      /* Картинка картки. */
      thumbnail: "/images/projects/3.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "",
  
      /* Заставка відео. */
      poster: "/images/projects/3.webp",
  
      /* true = показувати у рухомій стрічці. */
      showInMarquee: false,
  
      /* true = показувати картку на сайті. */
      published: true,
  
      /* Порядок усередині цієї категорії. */
      order: 2,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
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
      title: "Path Onboarding Sequence",
      category: "lottie-ui",
      description: "A concise onboarding sequence designed to guide attention without slowing the experience.",
  
      /* Картинка картки. */
      thumbnail: "/images/projects/1.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "",
  
      /* Заставка відео. */
      poster: "/images/projects/1.webp",
  
      /* true = показувати у рухомій стрічці. */
      showInMarquee: false,
  
      /* true = показувати картку на сайті. */
      published: true,
  
      /* Порядок усередині цієї категорії. */
      order: 3,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
      tags: ["Future project"],
      format: "Lottie JSON",
      delivery: "Mobile app",
      duration: "TBD",
  
      seoTitle: "Path Onboarding Sequence | VL Motion",
      seoDescription: "A concise onboarding sequence designed to guide attention without slowing the experience.",
    }
];
