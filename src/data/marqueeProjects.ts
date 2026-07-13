import { projects } from "./projects";

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

export const marqueeProjects: MarqueeProject[] = projects
  .filter((project) => project.enabled)
  .flatMap((project) => [
    {
      id: `${project.id}-video`,
      title: project.title,
      category: project.categorySlug,
      type: "video" as const,
      src: project.videoPath,
      poster: project.previewImage,
      href: `/work/${project.categorySlug}`,
      alt: `${project.title} motion preview`,
    },
    {
      id: `${project.id}-poster`,
      title: project.title,
      category: project.categorySlug,
      type: "image" as const,
      src: project.previewImage,
      href: `/work/${project.categorySlug}`,
      alt: `${project.title} poster`,
    },
  ]);
