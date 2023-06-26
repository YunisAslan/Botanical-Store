export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};

export type DocsConfig = {
  mainNav: NavItem[];
};

export type SiteConfig = {
  url: string;
  github: string;
};
