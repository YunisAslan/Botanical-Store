"use client";

import { Product } from "@/types";
import Image from "next/image";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useProductStore } from "@/store/useProductStore";
import { useMounted } from "@/hooks/use-mounted";

function CartItem({ item }: { item: Product }) {
  const { products, removeItem, increaseItems, decreaseItems } =
    useProductStore();

  const mounted = useMounted();
  const cartProduct = products.find((product) => product.id === item.id);
  const quantity = cartProduct ? cartProduct.quantity : 0;
  const fixedPrice = item.plant_price.toFixed(2);
  const resultPrice = (Number(fixedPrice) * quantity).toFixed(2);

  const handleDelete = () => {
    removeItem(item);
  };

  const handleIncrease = () => {
    increaseItems(item);
  };

  const handleDecrease = () => {
    decreaseItems(item);
  };

  return (
    <div className="flex justify-between pr-7 py-4 border-b border-input dark:border-secondary">
      <div className="flex items-center space-x-4">
        <div>
          <Image
            src={item.img_url}
            alt={item.plant_name}
            width={64}
            height={64}
            priority
          />
        </div>

        <div className="flex flex-col space-y-2">
          <span className="capitalize line-clamp-1 text-sm font-semibold">
            {item.plant_name}
          </span>
          <span className="line-clamp-1 text-sm text-gray-600 dark:text-gray-400">
            &#36;
            {`${fixedPrice} x ${quantity} = $${resultPrice}`}
          </span>
          <span className="capitalize font-semibold line-clamp-1 text-xs text-gray-600 dark:text-gray-500">
            {item.plant_category}
          </span>
        </div>
      </div>

      {mounted && (
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrease}
            disabled={quantity === 1}
          >
            <Icons.minus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>

          <input
            type="number"
            className="bg-white dark:bg-secondary border border-input dark:border-secondary rounded outline-none px-1.5 py-1 h-8 w-14 text-sm"
            value={quantity}
            readOnly
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrease}
          >
            <Icons.plus className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDelete}
          >
            <Icons.delete className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartItem;
