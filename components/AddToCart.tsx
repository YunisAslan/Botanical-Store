"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Product } from "@/types";
import { useProductStore } from "@/store/use-product-store";
import { toast } from "react-hot-toast";

function AddToCart({ product, id }: { product: Product; id: string }) {
  const addToBasket = useProductStore((state) => state.addToBasket);

  const handleAddToCart = () => {
    addToBasket(product, id);

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
