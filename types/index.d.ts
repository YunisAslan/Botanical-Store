import { Timestamp } from "firebase/firestore";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  icon?: string;
};

export type DocsConfig = {
  mainNav: NavItem[];
  dashboardNav: NavItem[];
};

// ------------------------------

export type SiteConfig = {
  url: string;
  github: string;
  linkedin: string;
};

// --------------------------------------------------

type Product = {
  id?: string;
  plant_category?: string;
  plant_name: string;
  plant_pot_color?: string;
  plant_size?: string;
  plant_price: string;
  stock_quantity?: number;
  description: string;
  fileUpload?: string;
  img_url: string;
  created_at: any;
};

// Search Params  ----
// type SearchParams = {};
