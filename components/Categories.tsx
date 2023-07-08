"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";

const categories = ["Cactus", "Aloe", "Rose", "Orchids"];

function Categories() {
  const [categoryValue, setCategoryValue] = useState("");
  const router = useRouter();

  const handleClickCategory = (value: string) => {
    const lowerValue = value.toLowerCase();
    setCategoryValue(lowerValue);

    const params = new URLSearchParams();
    params.set("categories", lowerValue);
    const stringCategories = params.toString();

    if (stringCategories.includes(lowerValue)) {
      router.push(`/products?${stringCategories}`);
    }
  };

  return (
    <div className="pt-6">
      <h2 className="text-xl font-semibold pb-2">Categories</h2>

      <ul className="flex flex-col items-start justify-start gap-1">
        {categories.map((item) => (
          <Button
            className={cn(categoryValue === item.toLowerCase() && "text-lg")}
            size="link"
            variant="link"
            key={item}
            onClick={() => handleClickCategory(item)}
          >
            {item}
          </Button>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
