import { siteContent, type SocialLinkContent } from "./siteContent";

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

export const contactContent: ContactContent = {
  eyebrow: "CONTACT",
  heading: "Get in touch",
  description:
    "Have a project in mind? I'd love to hear about it. Tell me a little about your idea and let's make something meaningful together.",
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
  emailAddress: siteContent.email,
  socialLinks: siteContent.socialLinks,
  projectTypes: ["Logo animation", "Brand motion system", "Social content", "Lottie / UI motion", "Other"],
  budgets: ["Quick piece / 1-2 weeks", "Campaign / 2-4 weeks", "Brand system / 4+ weeks", "Not sure yet"],
};
