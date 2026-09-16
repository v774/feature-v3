import type { PortfolioProject } from "../portfolioContent";

/*
 * ANIMATED POSTERS / REELS - АДМІНКА
 * Тут тільки вертикальні ролики 1080x1920
 * Категорія всередині = posters (це social-promo)
 */

export const posterProjects: PortfolioProject[] = [
  {
    // --- ТЕХНІЧНЕ ---
    id: "placeholder-night-shift", // 🚫 ID
    slug: "night-shift", // 🚫 Слаг URL
    category: "social-promo", // 🚫 Має бути social-promo

    // --- КОНТЕНТ ---
    title: "Night Jazz Flyer", // ✅ Назва
    description: "Animated social promo for a live jazz event.", // ✅ Опис

    // --- МЕДІА ---
    thumbnail: "/images/prewiew/poster/Jazz.webp", // ✅ Картинка картки
    video: "/videos/animation/poster/jazz_reels.webm", // ✅ Відео
    poster: "/videos/animation/poster/jazz_reels.webm", // ✅ Постер (може бути те саме відео)

    // --- ПОКАЗ ---
    showInMarquee: true, // ✅ В бігучій стрічці?
    published: true, // ✅ На сайті?
    order: 1, // ✅ Порядок

    // --- МОДАЛКА ---
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "1080x1920 / MP4", // Формат вертикаль
    delivery: "Social campaign",
    duration: "18 sec",
    seoTitle: "Night Shift Poster | VL Motion",
    seoDescription: "A bold animated poster concept for a late-night music event and social campaign.",
  },
  {
    id: "placeholder-echo-event",
    slug: "echo-event",
    category: "social-promo",
    title: "Luxury car Reels",
    description: "Dynamic vertical reel created for luxury car rental promotion.",
    thumbnail: "/images/prewiew/poster/car_reels.webp",
    video: "/videos/animation/poster/car_reels.webm",
    poster: "/videos/animation/poster/car_reels.webm",
    showInMarquee: false,
    published: true,
    order: 2,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "1080x1920 / MP4",
    delivery: "Event media",
    duration: "12 sec",
    seoTitle: "Echo Event Visual | VL Motion",
    seoDescription: "An energetic event visual designed for venue screens, stories and promotional posts.",
  },
  {
    id: "placeholder-afterglow",
    slug: "afterglow",
    category: "social-promo",
    title: "Rozetka Reels",
    description: "Black Friday promotional animation for social media.",
    thumbnail: "/images/prewiew/poster/rozetka_reels.webp",
    video: "/videos/animation/poster/rozetka_reels.webm",
    poster: "/videos/animation/poster/rozetka_reels.webm",
    showInMarquee: false,
    published: true,
    order: 3,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "1080x1920 / MP4",
    delivery: "Campaign assets",
    duration: "12 sec",
    seoTitle: "Afterglow Campaign Poster | VL Motion",
    seoDescription: "A flexible animated campaign poster with strong typography and atmospheric motion.",
  },
  {
  id: "topmid-explainer",
  slug: "topmid-auto-store",
  category: "explainer-video",
  title: "TopMid Auto Store",
  description: "A 2D explainer animation for an auto parts and service store. Created as a Top 5 finalist entry for a motion design contest.",
  thumbnail: "/images/prewiew/poster/topmid.webp",
  video: "/videos/animation/poster/topmid.webm",
  poster: "/videos/animation/poster/topmid.webm",
  showInMarquee: false,
  published: true,
  order: 8,
  client: "TopMid (Contest Entry)",
  year: "2026",
  tools: ["After Effects, Illustrator"],
  tags: ["2D Explainer", "Character Animation", "Contest Finalist"],
  format: "1920x1080 / MP4",
  delivery: "Social Media / Web",
  duration: "20 sec",
  seoTitle: "TopMid 2D Explainer Animation | VL Motion",
  seoDescription: "An engaging 2D explainer video for the TopMid auto store featuring character animation and motion graphics."
},
  {
    id: "fruit-loot-promo",
    slug: "fruit-loot-promo",
    category: "social-promo",
    title: "Fruit Loot",
    description: "A bright animated promo for a gaming event. Focused on dynamic text reveals and 2D elements.",
    thumbnail: "/images/prewiew/poster/fruit_loot.webp",
    video: "/videos/animation/poster/fruit_loot.webm",
    poster: "/videos/animation/poster/fruit_loot.webm",
    showInMarquee: false,
    published: true,
    order: 1,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator"],
    tags: ["2D Animation", "Promo"],
    format: "1920x1080 / MP4",
    delivery: "Social Media",
    duration: "7 sec",
    seoTitle: "Fruit Loot Promo | VL Motion",
    seoDescription: "A bright animated promo for a gaming event featuring dynamic text reveals."
  },
  {
    id: "maxxer-revelation",
    slug: "maxxer-revelation",
    category: "social-promo",
    title: "Maxxer Revelation",
    description: "Audio visualizer for a music release promotion. Features cover art animation, a reactive audio spectrum, and streaming platform badges.",
    thumbnail: "/images/prewiew/poster/maxxer_revelation.webp",
    video: "/videos/animation/poster/maxxer_revelation.webm",
    poster: "/videos/animation/poster/maxxer_revelation.webm",
    showInMarquee: false,
    published: true,
    order: 2,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Photoshop"],
    tags: ["Audio Visualizer", "Music Promo"],
    format: "1080x1080 / MP4",
    delivery: "Social Media",
    duration: "32 sec",
    seoTitle: "Maxxer Revelation Visualizer | VL Motion",
    seoDescription: "Audio visualizer for a music release promotion with reactive audio spectrum."
  },
  {
    id: "lucky-lanterns",
    slug: "lucky-lanterns",
    category: "social-promo",
    title: "Lucky Lanterns",
    description: "A themed promo video for a local event. Built on glow effects and stylized typography.",
    thumbnail: "/images/prewiew/poster/lucky_lanterns.webp",
    video: "/videos/animation/poster/lucky_lanterns.webm",
    poster: "/videos/animation/poster/lucky_lanterns.webm",
    showInMarquee: false,
    published: true,
    order: 3,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator"],
    tags: ["Motion Graphics", "Event Promo"],
    format: "1920x1080 / MP4",
    delivery: "Social Media",
    duration: "10 sec",
    seoTitle: "Lucky Lanterns Promo | VL Motion",
    seoDescription: "A themed promo video for a local event featuring glow effects and stylized typography."
  },
  {
    id: "hash-coffee-commercial",
    slug: "hash-coffee-commercial",
    category: "social-promo",
    title: "H.A.S.H Coffee",
    description: "Product video for a coffee brand. Utilizes dynamic editing, 3D packaging integration, and liquid simulation.",
    thumbnail: "/images/prewiew/poster/hash_coffee.webp",
    video: "/videos/animation/poster/hash_coffee.webm",
    poster: "/videos/animation/poster/hash_coffee.webm",
    showInMarquee: false,
    published: true,
    order: 4,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Photoshop"],
    tags: ["Product Promo", "Dynamic Editing"],
    format: "1920x1080 / MP4",
    delivery: "Social Media",
    duration: "12 sec",
    seoTitle: "H.A.S.H Coffee Commercial | VL Motion",
    seoDescription: "Product video for a coffee brand with dynamic editing and 3D packaging integration."
  },
  {
    id: "team-up-hackathon",
    slug: "team-up-hackathon",
    category: "social-promo",
    title: "Team Up",
    description: "Fast-paced shape animation for an IT event announcement. Emphasizes kinetic typography, contrast transitions, and vector graphics.",
    thumbnail: "/images/prewiew/poster/team_up.webp",
    video: "/videos/animation/poster/team_up.webm",
    poster: "/videos/animation/poster/team_up.webm",
    showInMarquee: false,
    published: true,
    order: 5,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator"],
    tags: ["Kinetic Typography", "Shape Animation"],
    format: "1920x1080 / MP4",
    delivery: "Social Media",
    duration: "11 sec",
    seoTitle: "Team Up Hackathon Teaser | VL Motion",
    seoDescription: "Fast-paced shape animation for an IT event announcement with kinetic typography."
  }
];
