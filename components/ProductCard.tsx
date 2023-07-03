import Image from "next/image";
import product01 from "@/public/assets/images/products/product-01.jpg";
import { Button, buttonVariants } from "./ui/Button";
import { Product } from "@/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

function ProductCard({ item }: { item: Product }) {
  return (
    <div className="border border-input rounded cursor-pointer group shadow-sm">
      <div className="relative border-b border-input overflow-hidden rounded">
        <Image
          src={product01}
          alt=""
          width={300}
          height={225}
          className="object-cover rounded-t group-hover:scale-110 transition-transform duration-200 ease-in"
        />
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-lg pb-1">{item.plant_name}</h2>
        <span className="text-gray-600">&#36;{item.plant_price}</span>
      </div>

      <div className="p-4 flex justify-center gap-4">
        <Link
          href={`products/${item.id}`}
          className={cn(buttonVariants({ variant: "outline", size: "mm" }))}
        >
          Preview
        </Link>

        <Button variant="primary" size="mm" className="px-5">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
