import { siteContent } from "./siteContent";

const heroVideoSrc = new URL("../assets/videos/hero/neon-llama.mp4", import.meta.url).href;

export interface ServiceContent {
  number: string;
  title: string;
  description: string;
}

export interface AboutDecorationContent {
  className: string;
  src: string;
  spreadX: number;
  spreadY: number;
}

export interface HomepageContent {
  hero: {
    brand: string;
    kicker: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    availability: string;
    location: string;
    highlights: string[];
    localVideoSrc: string;
    desktopSequence: {
      basePath: string;
      filePrefix: string;
      extension: string;
      frameCount: number;
      framePadding: number;
    };
    watermark: string;
    highlightsAriaLabel: string;
  };
  marquee: {
    ariaLabel: string;
  };
  about: {
    heading: string;
    text: string;
    decorations: AboutDecorationContent[];
  };
  services: {
    heading: string;
    items: ServiceContent[];
  };
  projects: {
    heading: string;
    liveProjectLabel: string;
  };
}

export const homepageContent: HomepageContent = {
  hero: {
    brand: siteContent.brandName,
    kicker: "Motion designer",
    headline: "I bring brands\nto life through motion.",
    description:
      "I design premium logo animations and brand motion systems that make businesses unforgettable.",
    primaryCta: "View my work",
    secondaryCta: "Watch showreel",
    availability: "Available for new projects",
    location: "Worldwide",
    highlights: ["Logo Animation", "Brand Motion", "Lottie UI"],
    localVideoSrc: heroVideoSrc,
    desktopSequence: {
      basePath: "/images/hero/heroSeccvence",
      filePrefix: "neon-llama-ishodnik_",
      extension: "webp",
      frameCount: 121,
      framePadding: 5,
    },
    watermark: "VL MOTION",
    highlightsAriaLabel: "Portfolio highlights",
  },
  marquee: {
    ariaLabel: "Selected visual work",
  },
  about: {
    heading: "About me",
    text:
      "With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!",
    decorations: [
      {
        className: "about-decoration about-decoration-top-left",
        src: "/images/about/top-left.png",
        spreadX: -180,
        spreadY: -120,
      },
      {
        className: "about-decoration about-decoration-bottom-left",
        src: "/images/about/bottom-left.png",
        spreadX: -170,
        spreadY: 130,
      },
      {
        className: "about-decoration about-decoration-top-right",
        src: "/images/about/top-right.png",
        spreadX: 180,
        spreadY: -120,
      },
      {
        className: "about-decoration about-decoration-bottom-right",
        src: "/images/about/bottom-right.png",
        spreadX: 170,
        spreadY: 130,
      },
    ],
  },
  services: {
    heading: "Services",
    items: [
      {
        number: "01",
        title: "3D Modeling",
        description:
          "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations.",
      },
      {
        number: "02",
        title: "Rendering",
        description:
          "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life.",
      },
      {
        number: "03",
        title: "Motion Design",
        description:
          "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences.",
      },
      {
        number: "04",
        title: "Branding",
        description:
          "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence.",
      },
      {
        number: "05",
        title: "Web Design",
        description:
          "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience.",
      },
    ],
  },
  projects: {
    heading: "Project",
    liveProjectLabel: "Live Project",
  },
};
