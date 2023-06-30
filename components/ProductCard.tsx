import Image from "next/image";
import product01 from "@/public/assets/images/products/product-01.jpg";
import { Button } from "./ui/Button";

function ProductCard() {
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
        <h2 className="font-semibold text-lg pb-1">Kaktus</h2>
        <span className="text-gray-600">$50</span>
      </div>

      <div className="p-4 flex justify-center gap-4">
        <Button variant="outline" size="mm" className="px-6">
          Preview
        </Button>
        <Button variant="primary" size="mm" className="px-6">
          Add to cart
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
