"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Product } from "@/types";

function SearchProduct({ products }: { products: Product[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const btnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    startTransition(async () => {
      if (searchQuery.trim() === "") {
        setFilteredProducts([]);
      } else {
        const keywords = searchQuery.toLowerCase().trim().split(/\s+/);
        setFilteredProducts(
          products.filter((product) =>
            keywords.every((keyword) =>
              product.plant_name.toLowerCase().includes(keyword)
            )
          )
        );
      }
    });
  }, [searchQuery, products]);

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
    setIsOpen(false);
  };

  // click outside
  ///////////////
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={btnRef}
        className="border transition-colors duration-500 shadow-sm hover:bg-inputBg dark:hover:bg-slight/70 border-input dark:border-secondary flex justify-center items-center active:scale-95 rounded h-9 w-9 xl:w-60 xl:px-3 xl:py-2 xl:justify-start"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.search className="w-5 h-5 xl:mr-3 dark:text-white" />
        <span className="hidden xl:flex font-semibold text-sm text-primary dark:text-white">
          Search products..
        </span>
      </button>

      <div
        className={cn(
          "pt-32 fixed inset-0 bg-white/40 dark:bg-secondary/10 flex justify-center w-full backdrop-blur-sm invisible z-10",
          isOpen && "visible"
        )}
      >
        <div className="flex flex-col overflow-auto" ref={searchRef}>
          <div className="flex items-center">
            <div
              className={cn(
                "flex items-center relative opacity-0 duration-500 transition-opacity ease-out",
                isOpen && "opacity-100"
              )}
            >
              <Icons.search className="w-5 h-5 absolute left-3 text-gray-600" />
              <input
                type="text"
                className="border border-input dark:border-secondary outline-none px-10 py-3 rounded bg-white dark:bg-secondary w-96 md:w-[32rem] dark:text-white"
                placeholder="Search products.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <Button
                name="Close Search bar"
                className="absolute right-4"
                variant="ghost"
                size="mm"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Icons.X className="w-5 h-5 text-gray-600" />
              </Button>
            </div>
          </div>

          <div
            className={cn(
              "border-x border-b px-2 py-2 bg-white border-input dark:border-secondary dark:bg-secondary rounded shadow-md space-y-2"
            )}
          >
            {isPending ? (
              <>
                <div className="p-2 bg-gray-300 dark:bg-slight/70 h-7 animate-pulse rounded" />
              </>
            ) : filteredProducts.length === 0 ? (
              <p className="py-4 text-primary dark:text-white text-center text-sm lg:text-base">
                No products found. Try again{" "}
                <span className="text-gray-700 dark:text-gray-500 font-medium">
                  or
                </span>{" "}
                add{" "}
                <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-secondary dark:before:bg-white dark:bg-white relative inline-block mx-1">
                  {" "}
                  <span className="relative text-white dark:text-primary font-semibold">
                    new
                  </span>
                </span>{" "}
                product.
              </p>
            ) : (
              searchQuery &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id as string)}
                  className="cursor-pointer p-2 hover:bg-inputBg dark:hover:bg-slight/70 rounded capitalize"
                >
                  {product.plant_name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchProduct;
