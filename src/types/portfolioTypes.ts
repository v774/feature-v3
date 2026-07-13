export type NavigationItem = {
  label: string;
  href: string;
};

export type Service = {
  number: string;
  title: string;
  description: string;
};

export type ProjectImages = {
  leftTop: string;
  leftBottom: string;
  right: string;
};

export type Project = {
  number: string;
  name: string;
  category: string;
  href: string;
  images: ProjectImages;
};
