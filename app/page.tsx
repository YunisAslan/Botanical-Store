import ChooseUs from "@/components/ChooseUs";
import Hero from "@/components/Hero";
import Image from "next/image";
import SeperatorImg from "@/public/assets/images/seperator-img.png";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/types";
import Subscribe from "@/components/Subscribe";
import Footer from "@/components/Footer";

export default async function Home() {
  const productData = await getProducts();
  const slicedProducts = productData?.slice(0, 10);

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
            src={SeperatorImg}
            alt="Botanical Store Seperator"
            width={370}
            height={30}
          />
        </div>

        <div className="grid grid-cols-4 gap-6 pt-10">
          {productData?.map((item: Product) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </div>
      </section>
      {/* Featured Products */}
      {/* Subscribe Our Nesletter */}
      <Subscribe />

      <Footer />
    </div>
  );
}
