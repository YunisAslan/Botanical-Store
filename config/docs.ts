import { DocsConfig } from "@/types";

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Dashboard",
      href: "/dashboard/store",
    },
    {
      title: "Tech Stack",
      href: "/tech-stack",
    },
  ],
  dashboardNav: [
    {
      title: "Account",
      href: "/dashboard/account",
      icon: "person",
      disabled: true,
    },
    {
      title: "Products",
      href: "/dashboard/store",
      icon: "bag",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "card",
      disabled: true,
    },
    {
      title: "Purchases",
      href: "/dashboard/purchases",
      icon: "dollar",
      disabled: true,
    },
  ],
};
