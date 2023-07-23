"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Product } from "@/types";
import { useProductStore } from "@/store/useProductStore";
import { toast } from "react-hot-toast";

function AddToCart({ product }: { product: Product }) {
  const { addToBasket } = useProductStore();

  const handleAddToCart = () => {
    addToBasket(product);

    toast.success("Added to cart.");
  };

  return (
    <>
      <Button
        variant="primary"
        className={cn("px-5 h-8 py-0 text-sm")}
        onClick={handleAddToCart}
      >
        Add to cart
      </Button>
    </>
  );
}

export default AddToCart;
