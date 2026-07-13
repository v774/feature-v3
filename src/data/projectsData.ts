import type { Project } from "../types/portfolioTypes";

export const projects: Project[] = [
  {
    number: "01",
    name: "Logo Animation",
    category: "Logo Animation",
    href: "/work/logo-animation",
    images: {
      leftTop: "/images/projects/1.webp",
      leftBottom: "/images/projects/2.webp",
      right: "/images/projects/3.webp",
    },
  },
  {
    number: "02",
    name: "Icons",
    category: "Icon Motion",
    href: "/work/icons",
    images: {
      leftTop: "/images/projects/2.webp",
      leftBottom: "/images/projects/4.webp",
      right: "/images/projects/1.webp",
    },
  },
  {
    number: "03",
    name: "Lottie UI",
    category: "Lottie UI",
    href: "/work/lottie-ui",
    images: {
      leftTop: "/images/projects/4.webp",
      leftBottom: "/images/projects/3.webp",
      right: "/images/projects/2.webp",
    },
  },
  {
    number: "04",
    name: "Posters",
    category: "Animated Posters",
    href: "/work/posters",
    images: {
      leftTop: "/images/projects/3.webp",
      leftBottom: "/images/projects/1.webp",
      right: "/images/projects/4.webp",
    },
  },
];
