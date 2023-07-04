import Image from "next/image";
import { Button, buttonVariants } from "./ui/Button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ProductCard({ item }: { item: Product }) {
  return (
    <div className="border border-input rounded cursor-pointer group shadow-sm w-72">
      <div className="border-b border-input overflow-hidden rounded">
        <Image
          src={item.img_url}
          alt={item.plant_name}
          width={300}
          height={225}
          className=" rounded-t group-hover:scale-105 transition-transform duration-200 ease-in"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg pb-1">{item.plant_name}</h2>
        <span className="text-gray-600">&#36;{item.plant_price}</span>
      </div>

      <div className="p-4 flex justify-center gap-4">
        <Link
          href={`products/${item.id}`}
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
