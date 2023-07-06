"use client";

import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

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

  // console.log("Selected Value", selectedValue);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  return (
    <form
      action={(FormData) => {
        const searchTerm = FormData.get("searchTerm");
      }}
    >
      <select
        className="bg-gray-50 border border-input text-font text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5"
        placeholder="value"
        value={selectedValue}
        onChange={handleSelectChange}
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
