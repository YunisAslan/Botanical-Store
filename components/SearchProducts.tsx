"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

function SearchProduct() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
        <span className="hidden xl:flex font-semibold text-sm text-font dark:text-white">
          Search products..
        </span>
      </button>

      <div
        className={cn(
          "fixed inset-0 bg-white/40 dark:bg-secondary/10 flex justify-center w-full backdrop-blur-sm invisible z-10",
          isOpen && "visible"
        )}
      >
        <div className="h-1/2 flex items-center">
          <div
            className={cn(
              "flex items-center relative opacity-0 duration-500 transition-opacity ease-out",
              isOpen && "opacity-100"
            )}
            ref={searchRef}
          >
            <Icons.search className="w-5 h-5 absolute left-3 text-gray-600" />
            <input
              type="text"
              className="border border-input dark:border-secondary outline-none px-10 py-3 rounded bg-white dark:bg-secondary w-96 md:w-[32rem] dark:text-white"
              placeholder="Search products.."
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
      </div>
    </>
  );
}

export default SearchProduct;
