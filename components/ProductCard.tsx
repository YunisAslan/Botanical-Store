"use client";

import Image from "next/image";
import { Button, buttonVariants } from "./ui/Button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icons } from "./Icons";

function ProductCard({ item }: { item: Product }) {
  const fixedPrice = Number(item.plant_price).toFixed(2);

  return (
    <div className="border border-input rounded cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 ease-in">
      {item.img_url ? (
        <div className="border-b border-input overflow-hidden rounded h-64 relative">
          <Image
            src={item.img_url}
            alt={item.plant_name}
            fill
            quality={100}
            className="object-cover rounded-t"
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
        <span className="text-gray-600">&#36;{fixedPrice}</span>
      </div>

      <div className="p-4 flex justify-center gap-4">
        <Link
          prefetch
          href={`product/${item.id}`}
          className={cn(
            buttonVariants({ variant: "outline" }) + "px-5 h-8 py-0 text-sm"
          )}
        >
          Preview
        </Link>

        <Button variant="primary" className={cn("px-5 h-8 py-0 text-sm")}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
