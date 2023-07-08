"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingButton } from "./ui/LoadingButton";
import { Icons } from "./Icons";

const SORT_BY = {
  // query params
  az: "Alphabetical: A to Z", // sort_by=az
  za: "Alphabetical: Z to A",
  on: "Date: Old to new",
  no: "Date: New to old",
  lh: "Price: Low to high",
  hl: "Price: High to low",
};

function SelectFilters() {
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  return (
    <form
      className=" flex gap-2 items-center"
      action={(formData) => {
        // we can get formData

        const params = new URLSearchParams();
        params.set("sort_by", selectedValue);
        const queryString = params.toString();

        if (queryString.includes(selectedValue)) {
          return router.push(`/products?${queryString}`);
        }
      }}
    >
      <LoadingButton type="submit" size="mm" variant="primary">
        <Icons.flower />
      </LoadingButton>
      <select
        className="bg-gray-50 border border-input text-font rounded-lg focus:border-green-500 block p-2.5 outline-none text-base font-medium"
        placeholder="value"
        value={selectedValue}
        onChange={(e) => setSelectedValue(e.target.value)}
      >
        <option value="DEFAULT">Sort by</option>
        {Object.entries(SORT_BY).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </form>
  );
}

export default SelectFilters;