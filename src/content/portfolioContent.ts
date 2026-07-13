export interface PortfolioCategory {
  slug: string;
  label: string;
  description: string;
  enabled: boolean;
  size: "large" | "small" | "wide";
  order: number;
}

export interface PortfolioProjectImages {
  leftTop: string;
  leftBottom: string;
  right: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  thumbnail: string;
  video: string;
  poster: string;
  images: PortfolioProjectImages;
  featured: boolean;
  showInMarquee: boolean;
  published: boolean;
  order: number;
  client: string;
  year: string;
  tools: string[];
  tags: string[];
  format: string;
  delivery: string;
  duration: string;
  seoTitle: string;
  seoDescription: string;
  featuredTitle?: string;
  featuredCategory?: string;
}

export interface CategoryProject {
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
}

export interface FeaturedHomepageProject {
  number: string;
  name: string;
  category: string;
  href: string;
  images: PortfolioProjectImages;
}

export interface MarqueeProject {
  id: string;
  title: string;
  category: string;
  type: "image" | "video";
  src: string;
  poster?: string;
  href?: string;
  alt: string;
}

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "logo-animation",
    label: "Logo Animation",
    description: "Cinematic logo reveals and animated brand marks.",
    enabled: true,
    size: "large",
    order: 1,
  },
  {
    slug: "icons",
    label: "Icons",
    description: "Compact icon motion pieces and luminous micro-interactions.",
    enabled: true,
    size: "small",
    order: 2,
  },
  {
    slug: "lottie-ui",
    label: "Lottie UI",
    description: "Product interfaces brought to life with purposeful motion.",
    enabled: true,
    size: "small",
    order: 3,
  },
  {
    slug: "posters",
    label: "Posters",
    description: "Experimental animated posters and additional motion projects.",
    enabled: true,
    size: "wide",
    order: 4,
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "logo-identity-01",
    slug: "teci-logo-reveal",
    title: "TECI - Logo Reveal",
    category: "logo-animation",
    description: "A clean cinematic logo reveal for the TECI brand.",
    thumbnail: "/images/projects/1.webp",
    video: "/videos/Logo_animation/2.webm",
    poster: "/images/projects/1.webp",
    images: {
      leftTop: "/images/projects/1.webp",
      leftBottom: "/images/projects/2.webp",
      right: "/images/projects/3.webp",
    },
    featured: true,
    showInMarquee: true,
    published: true,
    order: 1,
    client: "TECI",
    year: "2026",
    tools: ["After Effects", "Illustrator"],
    tags: ["Minimal", "Clean"],
    format: "WEBM",
    delivery: "Digital",
    duration: "00:04",
    seoTitle: "TECI Logo Reveal | VL Motion",
    seoDescription: "A clean cinematic logo reveal created by VL Motion.",
    featuredTitle: "Logo Animation",
    featuredCategory: "Logo Animation",
  },
  {
    id: "logo-identity-02",
    slug: "nexus-logo-animation",
    title: "Nexus - Logo Animation",
    category: "logo-animation",
    description: "A futuristic logo animation.",
    thumbnail: "/images/projects/2.webp",
    video: "/videos/Logo_animation/8.webm",
    poster: "/images/projects/2.webp",
    images: {
      leftTop: "/images/projects/2.webp",
      leftBottom: "/images/projects/4.webp",
      right: "/images/projects/1.webp",
    },
    featured: false,
    showInMarquee: true,
    published: true,
    order: 2,
    client: "Nexus",
    year: "2026",
    tools: ["After Effects"],
    tags: ["Futuristic", "Tech"],
    format: "WEBM",
    delivery: "Digital",
    duration: "00:08",
    seoTitle: "Nexus Logo Animation | VL Motion",
    seoDescription: "A futuristic logo animation created by VL Motion.",
  },
  {
    id: "icons-01",
    slug: "vl-icon-motion",
    title: "VL - Icon Motion",
    category: "icons",
    description: "A compact icon motion piece with clean timing and luminous detail.",
    thumbnail: "/images/projects/3.webp",
    video: "/videos/Brand_motion/1.webm",
    poster: "/images/projects/3.webp",
    images: {
      leftTop: "/images/projects/2.webp",
      leftBottom: "/images/projects/4.webp",
      right: "/images/projects/1.webp",
    },
    featured: true,
    showInMarquee: true,
    published: true,
    order: 3,
    client: "VL Motion",
    year: "2026",
    tools: ["After Effects"],
    tags: ["Icons", "Micro Motion"],
    format: "WEBM",
    delivery: "Digital",
    duration: "00:18",
    seoTitle: "VL Icon Motion | VL Motion",
    seoDescription: "A compact icon motion piece created by VL Motion.",
    featuredTitle: "Icons",
    featuredCategory: "Icon Motion",
  },
  {
    id: "lottie-ui-01",
    slug: "elevate-ui-motion",
    title: "Elevate - UI Motion",
    category: "lottie-ui",
    description: "A bold interface animation.",
    thumbnail: "/images/projects/4.webp",
    video: "/videos/Lotti_Ui/3.webm",
    poster: "/images/projects/4.webp",
    images: {
      leftTop: "/images/projects/4.webp",
      leftBottom: "/images/projects/3.webp",
      right: "/images/projects/2.webp",
    },
    featured: true,
    showInMarquee: true,
    published: true,
    order: 4,
    client: "Elevate",
    year: "2026",
    tools: ["After Effects"],
    tags: ["Bold", "Dynamic"],
    format: "WEBM",
    delivery: "Web / App",
    duration: "00:10",
    seoTitle: "Elevate UI Motion | VL Motion",
    seoDescription: "A bold interface animation created by VL Motion.",
    featuredTitle: "Lottie UI",
    featuredCategory: "Lottie UI",
  },
  {
    id: "posters-01",
    slug: "alpha-animated-poster",
    title: "Alpha - Animated Poster",
    category: "posters",
    description: "A clear modern animation.",
    thumbnail: "/images/projects/2.webp",
    video: "/videos/Posters/4.webm",
    poster: "/images/projects/2.webp",
    images: {
      leftTop: "/images/projects/3.webp",
      leftBottom: "/images/projects/1.webp",
      right: "/images/projects/4.webp",
    },
    featured: true,
    showInMarquee: true,
    published: true,
    order: 5,
    client: "Alpha",
    year: "2026",
    tools: ["After Effects"],
    tags: ["Clear", "Modern"],
    format: "WEBM",
    delivery: "Social",
    duration: "00:12",
    seoTitle: "Alpha Animated Poster | VL Motion",
    seoDescription: "A modern animated poster created by VL Motion.",
    featuredTitle: "Posters",
    featuredCategory: "Animated Posters",
  },
  {
    id: "social-media-01",
    slug: "onyx-social-content",
    title: "Onyx - Social Content",
    category: "social-media",
    description: "A luxury motion direction.",
    thumbnail: "/images/projects/1.webp",
    video: "/videos/Social_media/7.webm",
    poster: "/images/projects/1.webp",
    images: {
      leftTop: "/images/projects/1.webp",
      leftBottom: "/images/projects/2.webp",
      right: "/images/projects/3.webp",
    },
    featured: false,
    showInMarquee: false,
    published: true,
    order: 6,
    client: "Onyx",
    year: "2026",
    tools: ["After Effects"],
    tags: ["Luxury", "Elegant"],
    format: "WEBM",
    delivery: "Social",
    duration: "00:15",
    seoTitle: "Onyx Social Content | VL Motion",
    seoDescription: "Luxury social content motion direction created by VL Motion.",
  },
];

export const showreelProject: CategoryProject = {
  id: "showreel",
  title: "Brand motion showreel",
  categorySlug: "showreel",
  description: "A selection of logo animation, brand motion systems and visual content.",
  tags: ["Showreel", "Motion Design"],
  videoPath: "/videos/showreel/main-showreel.webm",
  previewImage: "",
  format: "WEBM",
  software: "After Effects",
  delivery: "Digital",
  duration: "01:28",
  enabled: true,
};

export const categories = portfolioCategories
  .filter((category) => category.enabled)
  .sort((a, b) => a.order - b.order)
  .map(({ slug, enabled, size }) => ({ slug, enabled, size }));

export const projects: CategoryProject[] = portfolioProjects
  .filter((project) => project.published)
  .sort((a, b) => a.order - b.order)
  .map((project) => ({
    id: project.id,
    title: project.title,
    categorySlug: project.category,
    description: project.description,
    tags: project.tags,
    videoPath: project.video,
    previewImage: project.thumbnail,
    format: project.format,
    software: project.tools.join(", "),
    delivery: project.delivery,
    duration: project.duration,
    enabled: project.published,
  }));

export const featuredHomepageProjects: FeaturedHomepageProject[] = portfolioProjects
  .filter((project) => project.published && project.featured)
  .sort((a, b) => a.order - b.order)
  .map((project, index) => ({
    number: String(index + 1).padStart(2, "0"),
    name: project.featuredTitle ?? project.title,
    category: project.featuredCategory ?? portfolioCategories.find((category) => category.slug === project.category)?.label ?? project.category,
    href: `/work/${project.category}`,
    images: project.images,
  }));

export const marqueeProjects: MarqueeProject[] = portfolioProjects
  .filter((project) => project.published && project.showInMarquee)
  .sort((a, b) => a.order - b.order)
  .flatMap((project) => [
    {
      id: `${project.id}-video`,
      title: project.title,
      category: project.category,
      type: "video" as const,
      src: project.video,
      poster: project.poster,
      href: `/work/${project.category}`,
      alt: `${project.title} motion preview`,
    },
    {
      id: `${project.id}-poster`,
      title: project.title,
      category: project.category,
      type: "image" as const,
      src: project.thumbnail,
      href: `/work/${project.category}`,
      alt: `${project.title} poster`,
    },
  ]);
