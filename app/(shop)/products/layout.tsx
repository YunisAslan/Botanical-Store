import Categories from "@/components/Categories";
import { Icons } from "@/components/Icons";
import SearchBar from "@/components/SearchBar";
import { ReactNode } from "react";

interface ShopLayoutProps {
  children?: ReactNode;
}

export default async function ShopLayout({ children }: ShopLayoutProps) {
  return (
    <>
      {/* Location PATH */}
      <p className="flex items-center gap-1 pt-6">
        <span className="text-gray-500">Home</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-font">Products</span>
        {/* <Icons.chevronRight className="text-gray-500 w-4 h-4" /> */}
      </p>

      <div className="grid grid-cols-12 gap-6 pt-10 pb-20">
        <div className="left-side col-span-12 order-2 xl:col-span-3 xl:order-1">
          {/* LEFT SIDE SEARCH BAR for Products */}
          <SearchBar />

          <Categories />

          <div className="pt-6">
            <h6 className="text-xl font-semibold pb-3">Filter by price</h6>

            <form action="">
              <input
                id="default-range"
                type="range"
                // value="50"
                min={0}
                max={1000}
                step={100}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer text-primary"
              />
            </form>

            <p className="text-gray-600 pt-2">Price: &#36;50 - &#36;70</p>
          </div>
        </div>

        {children}
      </div>
    </>
  );
}
