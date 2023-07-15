"use client";

import { useState } from "react";
import { Icons } from "./Icons";
import { Product } from "@/types";
import { cn } from "@/lib/utils";

function ProductDescription(product: Product) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <button
        className="w-full text-font font-semibold text-lg flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Description</span>
        <Icons.chevronDown
          className={cn(
            "w-5 duration-500 transition-transform",
            isOpen && "-rotate-180"
          )}
        />
      </button>

      <div>
        <p
          className={cn(
            "transition-all duration-300 ease-in-out h-0 invisible opacity-0 pt-2",
            isOpen && "visible opacity-100 h-auto"
          )}
        >
          {product.description
            ? product.description
            : "This product has no description"}
        </p>
      </div>

      {/* <div className="border-b border-input my-3" /> */}
    </div>
  );
}

export default ProductDescription;
