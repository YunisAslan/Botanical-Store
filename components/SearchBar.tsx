"use client";

import { useEffect, useState } from "react";
import { Icons } from "./Icons";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
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
          className="border w-full xl:w-72 border-input outline-none pr-12 px-2 py-2 text-sm rounded hover:border-green-500 focus:border-green-500 duration-200 transition-all"
          type="text"
          placeholder="Search Products.."
          name="searchTerm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <LoadingButton type="submit" className="absolute right-0">
          <Icons.search className="w-5 h-5" />
        </LoadingButton>
      </form>
    </div>
  );
}

export default SearchBar;
