import Hero from "@/components/Hero";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Subscribe from "@/components/Subscribe";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/Button";

export default async function Home() {
  const productData = await getProducts();
  const slicedProducts = productData?.slice(0, 4);

  return (
    <div>
      <Hero />
      {/* Featured Products */}
      <section className="py-28 px-4 sm:px-8 lg:px-20 dark:bg-secondary">
        <h2 className="capitalize text-primary dark:text-white text-3xl font-semibold text-center pb-4">
          Featured products
        </h2>

        <div className="flex justify-center lg:justify-end pr-0 lg:pr-3">
          <Link
            href="/products"
            className={buttonVariants({
              variant: "primary",
              size: "sm",
            })}
          >
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-7">
          {slicedProducts?.map((item) => {
            return <ProductCard key={item.id} item={item} />;
          })}
        </div>
      </section>
      {/* Subscribe Our Newsletter */}
      <Subscribe />
    </div>
  );
}
