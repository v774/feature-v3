import { siteContent } from "../content/siteContent";

export const navigationItems = siteContent.navigation.map((item) => ({
  label: item.label,
  href: "/",
}));
