"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./ui/LoadingButton";

function SearchBar() {
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();
  console.log("Search Value: ", searchValue);

  return (
    <div className="w-full">
      <form
        action={(formData) => {
          const searchTerm = formData.get("searchTerm");
          console.log("SearchTerm", searchTerm);

          if (!searchTerm) return;

          const params = new URLSearchParams();
          console.log("Params", params);

          if (searchValue) params.set("q", searchValue.toString());

          /// products?q=test
          router.push(`/products?${params.toString().toLowerCase()}`);
        }}
        className="flex items-center relative"
      >
        <input
          className="border w-full xl:w-72 border-input outline-none pr-12 px-2 py-2 text-sm rounded"
          type="text"
          placeholder="Search Products.."
          name="searchTerm"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />

        <LoadingButton className="absolute right-0">
          <Icons.search className="w-5 h-5" />
        </LoadingButton>
      </form>
    </div>
  );
}

export default SearchBar;
