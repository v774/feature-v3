import type { PortfolioProject } from "../portfolioContent";

/*
 * ANIMATED ICONS - АДМІНКА
 * Тут тільки роботи категорії "icons"
 * 
 * Щоб додати нову іконку: скопіюй один об'єкт і поміняй поля нижче
 */

export const iconProjects: PortfolioProject[] = [
  {
    // --- ТЕХНІЧНЕ (не міняй id/slug/category якщо не розумієш) ---
    id: "placeholder-signal-icons", // 🚫 Унікальний ID, англ, без пробілів
    slug: "signal-icons", // 🚫 Слаг для URL: /work/icons/signal-icons
    category: "icons", // 🚫 Має бути "icons" для цієї папки

    // --- КОНТЕНТ (можна міняти) ---
    title: "Signal Icon Set", // ✅ Назва картки
    description: "A coordinated animated icon set for product navigation and visual communication.", // ✅ Опис

    // --- МЕДІА ---
    thumbnail: "/images/projects/1.webp", // ✅ Картинка картки в сітці
    video: "", // ✅ Відео (коли буде готове - встав шлях)
    poster: "/images/projects/1.webp", // ✅ Заставка відео

    // --- НАЛАШТУВАННЯ ПОКАЗУ ---
    showInMarquee: false, // ✅ true = показувати в бігучій стрічці зверху
    published: true, // ✅ true = показувати на сайті, false = чернетка
    order: 1, // ✅ Порядок: 1,2,3...

    // --- МОДАЛКА (інфо коли клікаєш на роботу) ---
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
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
    category: "icons",
    title: "Kinetic Control Icons",
    description: "Responsive control icons designed with consistent easing, weight and motion language.",
    thumbnail: "/images/projects/2.webp",
    video: "",
    poster: "/images/projects/2.webp",
    showInMarquee: false,
    published: false, // Чернетка - не показується
    order: 2,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
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
    category: "icons",
    title: "Beacon Navigation Set",
    description: "A clear navigation icon system with short, readable animated states.",
    thumbnail: "/images/projects/4.webp",
    video: "",
    poster: "/images/projects/4.webp",
    showInMarquee: false,
    published: false,
    order: 3,
    client: "Personal project",
    year: "2026",
    tools: ["After Effects, Illustrator, Photoshop"],
    tags: ["Future project"],
    format: "Lottie / SVG",
    delivery: "Web and app",
    duration: "TBD",
    seoTitle: "Beacon Navigation Set | VL Motion",
    seoDescription: "A clear navigation icon system with short, readable animated states.",
  },
];
