export type Project = {
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
  duration: string;
  enabled: boolean;
};

const logoPreview = "/images/projects/1.webp";
const nexusPreview = "/images/projects/2.webp";
const auroraPreview = "/images/projects/3.webp";
const elevatePreview = "/images/projects/4.webp";

export const projects: Project[] = [
  {
    id: "logo-identity-01",
    title: "TECI - Logo Reveal",
    categorySlug: "logo-animation",
    description: "A clean cinematic logo reveal for the TECI brand.",
    tags: ["Minimal", "Clean"],
    videoPath: "/videos/Logo_animation/2.webm",
    previewImage: logoPreview,
    format: "WEBM",
    software: "After Effects, Illustrator",
    delivery: "Digital",
    duration: "00:04",
    enabled: true,
  },
  {
    id: "logo-identity-02",
    title: "Nexus - Logo Animation",
    categorySlug: "logo-animation",
    description: "A futuristic logo animation.",
    tags: ["Futuristic", "Tech"],
    videoPath: "/videos/Logo_animation/8.webm",
    previewImage: nexusPreview,
    format: "WEBM",
    software: "After Effects",
    delivery: "Digital",
    duration: "00:08",
    enabled: true,
  },
  {
    id: "icons-01",
    title: "VL - Icon Motion",
    categorySlug: "icons",
    description: "A compact icon motion piece with clean timing and luminous detail.",
    tags: ["Icons", "Micro Motion"],
    videoPath: "/videos/Brand_motion/1.webm",
    previewImage: auroraPreview,
    format: "WEBM",
    software: "After Effects",
    delivery: "Digital",
    duration: "00:18",
    enabled: true,
  },
  {
    id: "lottie-ui-01",
    title: "Elevate - UI Motion",
    categorySlug: "lottie-ui",
    description: "A bold interface animation.",
    tags: ["Bold", "Dynamic"],
    videoPath: "/videos/Lotti_Ui/3.webm",
    previewImage: elevatePreview,
    format: "WEBM",
    software: "After Effects",
    delivery: "Web / App",
    duration: "00:10",
    enabled: true,
  },
  {
    id: "social-media-01",
    title: "Onyx - Social Content",
    categorySlug: "social-media",
    description: "A luxury motion direction.",
    tags: ["Luxury", "Elegant"],
    videoPath: "/videos/Social_media/7.webm",
    previewImage: logoPreview,
    format: "WEBM",
    software: "After Effects",
    delivery: "Social",
    duration: "00:15",
    enabled: true,
  },
  {
    id: "posters-01",
    title: "Alpha - Animated Poster",
    categorySlug: "posters",
    description: "A clear modern animation.",
    tags: ["Clear", "Modern"],
    videoPath: "/videos/Posters/4.webm",
    previewImage: nexusPreview,
    format: "WEBM",
    software: "After Effects",
    delivery: "Social",
    duration: "00:12",
    enabled: true,
  },
];
