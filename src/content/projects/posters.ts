/*
 * ANIMATED POSTERS
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

export const posterProjects: PortfolioProject[] = [
  {
      id: "placeholder-night-shift",
      slug: "night-shift",
      title: "Night Jazz Poster",
      category: "posters", 
      description: "A bold animated poster concept for a late-night music event and social campaign.",
  
      /* Картинка картки. */
      thumbnail: "/images/prewiew/poster/Jazz.webp",
  

      /* Встав сюди шлях, коли відео буде готове. */
      video: "/videos/animation/poster/jazz_reels.webm",
  
      /* Заставка відео. */
      poster: "/videos/animation/poster/jazz_reels.webm",
  
      /* true = показувати у рухомій стрічці. */
      showInMarquee: true,
  
      /* true = показувати картку на сайті. */
      published: true,
  
      /* Порядок усередині цієї категорії. */
      order: 1,
  
      client: "Personal project",
      year: "2026",
      tools: ["After Effects"],
      tags: ["Future project"],
      format: "1080x1920 / MP4  ",
      delivery: "Social campaign",
      duration: "18 sec",
  
      seoTitle: "Night Shift Poster | VL Motion",
      seoDescription: "A bold animated poster concept for a late-night music event and social campaign.",
    },

  {
      id: "placeholder-echo-event",
      slug: "echo-event",
      title: "Luxury car Reels",
      category: "posters",
      description: "An energetic event visual designed for venue screens, stories and promotional posts.",
  
      /* Картинка картки. */
      thumbnail: "/images/prewiew/poster/car_reels.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "/videos/animation/poster/car_reels.webm",
  
      /* Заставка відео. */
      poster: "/videos/animation/poster/car_reels.webm",
  
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
      format: "MP4 / Story",
      delivery: "Event media",
      duration: "TBD",
  
      seoTitle: "Echo Event Visual | VL Motion",
      seoDescription: "An energetic event visual designed for venue screens, stories and promotional posts.",
    },

  {
      id: "placeholder-afterglow",
      slug: "afterglow",
      title: "Rozetka Reels",
      category: "posters",
      description: "A flexible animated campaign poster with strong typography and atmospheric motion.",
  
      /* Картинка картки. */
      thumbnail: "/images/prewiew/poster/rozetka_reels.webp",
  
      /* Встав сюди шлях, коли відео буде готове. */
      video: "/videos/animation/poster/rozetka_reels.webm",
  
      /* Заставка відео. */
      poster: "/videos/animation/poster/rozetka_reels.webm",
  
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
      format: "MP4 / Story",
      delivery: "Campaign assets",
      duration: "TBD",
  
      seoTitle: "Afterglow Campaign Poster | VL Motion",
      seoDescription: "A flexible animated campaign poster with strong typography and atmospheric motion.",
    }
];
