import Categories from "@/components/Categories";
import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";
import TopRate from "@/components/TopRate";
import { Metadata } from "next";
import { ReactNode } from "react";

interface ShopLayoutProps {
  children?: ReactNode;
}

export const metadata: Metadata = {
  title: "Botanical Products",
  description: "This is the botanical products layout",
};

export default async function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      {/* Location PATH */}
      <p className="dark:bg-secondary flex items-center gap-1 pt-6 px-4 sm:px-8 lg:px-20 h-full">
        <span className="text-gray-500">Home</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-primary dark:text-white">Products</span>
        {/* <Icons.chevronRight className="text-gray-500 w-4 h-4" /> */}
      </p>

      <div className="dark:bg-secondary grid grid-cols-12 gap-6 pt-10 pb-32 px-4 sm:px-8 lg:px-20">
        <div className="left-side col-span-12 order-2 xl:col-span-3 xl:order-1">
          {/* LEFT SIDE SEARCH BAR for Products */}
          <SearchBar />

          <Categories />

          <TopRate />
        </div>

        {children}
      </div>
    </>
  );
}
