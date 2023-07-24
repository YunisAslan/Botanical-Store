"use client";

import Image from "next/image";
import { buttonVariants } from "./ui/Button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";
import AddToCart from "./AddToCart";

function ProductCard({ item }: { item: Product }) {
  const fixedPrice = item.plant_price.toFixed(2);

  return (
    <div className="border border-input dark:border-secondary rounded cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ease-in">
      {item.img_url ? (
        <div className="border-b border-input dark:border-secondary overflow-hidden rounded h-64 relative">
          <Image
            src={item.img_url}
            alt={item.plant_name}
            priority
            fill
            quality={100}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t w-auto"
          />
        </div>
      ) : (
        <div className="border-b border-input overflow-hidden rounded h-[255px] bg-gray-100 flex justify-center items-center">
          <Icons.image width={40} height={40} className="text-gray-500" />
        </div>
      )}

      <div className="p-4">
        <h2 className="font-semibold text-lg pb-1 capitalize">
          {item.plant_name}
        </h2>
        <span className="text-gray-600 dark:text-gray-400">
          &#36;{fixedPrice}
        </span>
      </div>

      <div className="p-4 flex justify-center gap-4">
        <Link
          href={`product/${item.id}`}
          className={cn(
            buttonVariants({ variant: "outline" }) + "px-5 h-8 py-0 text-sm"
          )}
        >
          Preview
        </Link>

        <AddToCart product={item} />
      </div>
    </div>
  );
}

export default ProductCard;
