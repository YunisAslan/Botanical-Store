import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import ProductCard from "./ProductCard";
import { Product } from "@/types";
import { getProducts } from "@/lib/products";

async function FeaturedProducts() {
  const productData: Product[] = await getProducts();
  console.log(productData);

  return (
    <section className="pb-10">
      <h2 className="capitalize text-primary text-3xl font-semibold text-center pb-4">
        Featured products
      </h2>

      <div className="flex justify-center">
        <Image
          src={SeperatorImg}
          alt="Botanical Store Seperator"
          width={370}
          height={30}
        />
      </div>

      <div className="grid grid-cols-4 gap-6 pt-10">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>

      <div>
        {productData.map((product) => (
          <div className="text-4xl text-red-600">{product.plant_category}</div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
