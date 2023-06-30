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

// --------------------------------------------------

export interface Product {
  id: string;
  plant_category: string;
  plant_name: string;
  plant_pot_color: string;
  plant_size: string;
  plant_price: number;
  stock_quantity: number;
}
