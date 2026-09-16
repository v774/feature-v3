import { siteContent, type SocialLinkContent } from "./siteContent";

/* ==========================================================================
   🚫 НЕ ЧІПАТИ - ТЕХНІЧНІ ТИПИ
   Це структура даних. Зміна назв зламає сайт.
   ========================================================================== */
export interface ContactContent {
  // --- Тексти секції ---
  eyebrow: string;
  heading: string;
  description: string;

  // --- Поля форми ---
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;

  // --- Кнопки та дисклеймер ---
  send: string;
  sending: string;
  disclaimer: string;

  // --- Картки контактів (ліва колонка) ---
  connect: string;
  emailCardLabel: string;
  locationLabel: string;
  location: string;
  availabilityLabel: string;
  availability: string;
  socialLinksLabel: string;

  // --- Повідомлення після відправки ---
  successHeading: string;
  successMessage: string;
  resetButton: string;
  unavailableMessage: string;
  emptyMessage: string;
  failureMessage: string;

  // --- Автоматичні дані (тягнуться з siteContent.ts) ---
  emailAddress: string;
  socialLinks: SocialLinkContent[];

  // --- Варіанти для випадаючих списків ---
  projectTypes: string[];
  budgets: string[];
}

/* ==========================================================================
   ✅ АДМІНКА - ТУТ МОЖНА ВСЕ МІНЯТИ
   Це контент для клієнта. Міняй тексти сміливо.
   ========================================================================== */
export const contactContent: ContactContent = {
  
  // ------------------------------------------------------------------
  // 💡 ЗАГОЛОВКИ СЕКЦІЇ (те що бачить клієнт зверху)
  // ------------------------------------------------------------------
  eyebrow: "CONTACT", // ✅ Маленький надпис над заголовком
  heading: "Let’s create something that moves.", // ✅ Головний заголовок
  description:
    "Have a project in mind? Tell me what you’re working on, and I’ll help turn the idea into clear, polished motion.", // ✅ Опис під заголовком

  // ------------------------------------------------------------------
  // ✅ ПОЛЯ ФОРМИ (лейбли в інпутах)
  // ------------------------------------------------------------------
  name: "Name", // Назва поля Ім'я
  email: "Email", // Назва поля Пошта
  projectType: "Project type", // Назва поля Тип проєкту
  budget: "Budget / Timeline", // Назва поля Бюджет
  message: "Message", // Назва поля Повідомлення

  // ------------------------------------------------------------------
  // ✅ КНОПКИ
  // ------------------------------------------------------------------
  send: "Send message", // Текст на кнопці відправки
  sending: "Sending...", // Текст коли відправляється
  disclaimer: "Your information is safe and will never be shared.", // Текст під кнопкою

  // ------------------------------------------------------------------
  // ✅ ЛІВА КОЛОНКА - КАРТКИ КОНТАКТІВ
  // ------------------------------------------------------------------
  connect: "Connect", // Заголовок блоку з картками (якщо використовується)
  emailCardLabel: "Email us", // Підпис на картці пошти
  locationLabel: "Our location", // Лейбл локації
  location: "Location: Poland / Remote", // ✅ ТУТ МІНЯЙ ЛОКАЦІЮ
  availabilityLabel: "Availability", // Лейбл доступності
  availability: "Available worldwide", // ✅ ТУТ МІНЯЙ СТАТУС (напр. "Busy until June")
  socialLinksLabel: "Social links",

  // ------------------------------------------------------------------
  // ✅ ПОВІДОМЛЕННЯ ПІСЛЯ ВІДПРАВКИ ФОРМИ
  // ------------------------------------------------------------------
  successHeading: "Thank you!", // Заголовок успіху
  successMessage: "Your message has been sent successfully. We'll be in touch soon.", // Текст успіху
  resetButton: "Send another message", // Кнопка "Відправити ще"

  // --- Помилки ---
  unavailableMessage: "The contact form is temporarily unavailable. Please email us directly.",
  emptyMessage: "Please enter a message before submitting the form.",
  failureMessage: "We could not send your message. Please try again or email us directly.",

  // ------------------------------------------------------------------
  // 🚫 НЕ ЧІПАТИ - АВТОМАТИЧНО ТЯГНЕТЬСЯ З siteContent.ts
  // Міняй в siteContent.ts -> email і соцмережі підтягнуться сюди самі
  // ------------------------------------------------------------------
  emailAddress: siteContent.email,
  socialLinks: siteContent.socialLinks,

  // ------------------------------------------------------------------
  // ✅ СПИСКИ ДЛЯ ВИПАДАЮЧИХ МЕНЮ (можеш додавати/видаляти пункти)
  // ------------------------------------------------------------------
  projectTypes: [
    "Logo animation",
    "Brand motion system",
    "Social content",
    "Lottie / UI motion",
    "Other",
  ],

  budgets: [
    "Quick piece / 1-2 weeks",
    "Campaign / 2-4 weeks",
    "Brand system / 4+ weeks",
    "Not sure yet",
  ],
};
