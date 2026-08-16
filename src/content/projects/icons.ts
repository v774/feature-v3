/*
 * ANIMATED ICONS
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

export const iconProjects: PortfolioProject[] = [
  {
      id: "placeholder-signal-icons",
      slug: "signal-icons",
      title: "Signal Icon Set",
      category: "icons",
      description: "A coordinated animated icon set for product navigation and visual communication.",
  
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
      order: 1,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
      tags: ["Future project"],
      format: "Lottie / SVG",
      delivery: "Interface assets",
      duration: "TBD",
  
      seoTitle: "Signal Icon Set | VL Motion",
      seoDescription: "A coordinated animated icon set for product navigation and visual communication.",
    },

  {
      id: "placeholder-kinetic-icons",
      slug: "kinetic-icons",
      title: "Kinetic Control Icons",
      category: "icons",
      description: "Responsive control icons designed with consistent easing, weight and motion language.",
  
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
      order: 2,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
      tags: ["Future project"],
      format: "Lottie / SVG",
      delivery: "Product UI",
      duration: "TBD",
  
      seoTitle: "Kinetic Control Icons | VL Motion",
      seoDescription: "Responsive control icons designed with consistent easing, weight and motion language.",
    },

  {
      id: "placeholder-beacon-icons",
      slug: "beacon-icons",
      title: "Beacon Navigation Set",
      category: "icons",
      description: "A clear navigation icon system with short, readable animated states.",
  
      /* Картинка картки. */
      thumbnail: "/images/projects/4.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "",
  
      /* Заставка відео. */
      poster: "/images/projects/4.webp",
  
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
      format: "Lottie / SVG",
      delivery: "Web and app",
      duration: "TBD",
  
      seoTitle: "Beacon Navigation Set | VL Motion",
      seoDescription: "A clear navigation icon system with short, readable animated states.",
    }
];
