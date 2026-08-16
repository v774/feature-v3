import { siteContent, type SocialLinkContent } from "./siteContent";

/*
 * ТИПИ КОНТАКТНОЇ СЕКЦІЇ
 * Технічна частина. Назви полів не змінювати.
 */
export interface ContactContent {
  eyebrow: string;
  heading: string;
  description: string;
  name: string;
  email: string;
  projectType: string;
  budget: string;
  message: string;
  send: string;
  sending: string;
  disclaimer: string;
  connect: string;
  emailCardLabel: string;
  locationLabel: string;
  location: string;
  availabilityLabel: string;
  availability: string;
  socialLinksLabel: string;
  successHeading: string;
  successMessage: string;
  resetButton: string;
  unavailableMessage: string;
  emptyMessage: string;
  failureMessage: string;
  emailAddress: string;
  socialLinks: SocialLinkContent[];
  projectTypes: string[];
  budgets: string[];
}

/*
 * АДМІНКА КОНТАКТНОЇ СЕКЦІЇ
 *
 * Тут змінюються:
 * - заголовки та описи;
 * - назви полів форми;
 * - повідомлення про помилки й успіх;
 * - локація та доступність;
 * - типи проєктів;
 * - варіанти бюджету/термінів.
 */
export const contactContent: ContactContent = {
  eyebrow: "CONTACT",
  heading: "Let’s create something that moves.",
  description:
    "Have a project in mind? Tell me what you’re working on, and I’ll help turn the idea into clear, polished motion.",
  name: "Name",
  email: "Email",
  projectType: "Project type",
  budget: "Budget / Timeline",
  message: "Message",
  send: "Send message",
  sending: "Sending...",
  disclaimer: "Your information is safe and will never be shared.",
  connect: "Connect",
  emailCardLabel: "Email us",
  locationLabel: "Our location",
  location: "Ukraine / Remote",
  availabilityLabel: "Availability",
  availability: "Available worldwide",
  socialLinksLabel: "Social links",
  successHeading: "Thank you!",
  successMessage: "Your message has been sent successfully. We'll be in touch soon.",
  resetButton: "Send another message",
  unavailableMessage: "The contact form is temporarily unavailable. Please email us directly.",
  emptyMessage: "Please enter a message before submitting the form.",
  failureMessage: "We could not send your message. Please try again or email us directly.",
  /* Email автоматично береться з siteContent.ts. */
  emailAddress: siteContent.email,
  /* Соцмережі автоматично беруться з siteContent.ts. */
  socialLinks: siteContent.socialLinks,
  /* Варіанти у полі Project type. */
  projectTypes: ["Logo animation", "Brand motion system", "Social content", "Lottie / UI motion", "Other"],
  /* Варіанти у полі Budget / Timeline. */
  budgets: ["Quick piece / 1-2 weeks", "Campaign / 2-4 weeks", "Brand system / 4+ weeks", "Not sure yet"],
};
