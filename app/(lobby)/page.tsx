import ChooseUs from "@/components/ChooseUs";
import Hero from "@/components/Hero";
import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Subscribe from "@/components/Subscribe";

export default async function Home() {
  const productData = await getProducts();
  const slicedProducts = productData?.slice(0, 4);

  return (
    <div>
      <Hero />
      <ChooseUs />
      {/* Featured Products */}
      <section className="pb-28">
        <h2 className="capitalize text-primary text-3xl font-semibold text-center pb-4">
          Featured products
        </h2>

        <div className="flex justify-center">
          <Image
            className="w-3/4 sm:w-auto"
            src={SeperatorImg}
            alt="Botanical Store Seperator"
            width={370}
            height={30}
          />
        </div>

        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10">
          {slicedProducts?.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </div>
      </section>
      {/* Featured Products */}
      {/* Subscribe Our Nesletter */}
      <Subscribe />
    </div>
  );
}
