"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./ui/LoadingButton";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  return (
    <div className="w-full">
      <form
        className="flex items-center relative"
        action={(formData) => {
          const searchTerm = formData.get("searchTerm");

          if (!searchValue.trim() || !searchTerm) {
            return router.push("/products");
          }
          const params = new URLSearchParams();

          if (searchValue) params.set("q", searchValue.toString().trim());

          router.push(`/products?${params.toString().toLowerCase()}`);
          /// products?q=test
        }}
      >
        <input
          className="border w-full xl:w-72 dark:bg-secondary  text-primary dark:text-white border-input dark:border-secondary outline-none pr-12 px-2 py-2 text-sm rounded hover:border-font focus:border-font duration-200 transition-all placeholder:text-sm md:placeholder:text-base"
          type="text"
          placeholder="Search Products.."
          name="searchTerm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <LoadingButton name="Search" type="submit" className="absolute right-0">
          <Icons.search className="w-5 h-5" />
        </LoadingButton>
      </form>
    </div>
  );
}

export default SearchBar;
