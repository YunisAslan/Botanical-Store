import { Icons } from "@/components/Icons";
import { getProduct, getProducts } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { capitalize } from "@/lib/utils";
import ProductDescription from "@/components/ProductDescription";
import { Metadata } from "next";
import AddToCart from "@/components/AddToCart";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  // deduped
  // const product = await getProduct(id);
  const products = await getProducts();
  const product = products?.find((item) => item.id === id);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: capitalize(product.plant_name),
    description: product.description,
  };
}

export default async function ProductDetail({ params: { id } }: Props) {
  const product = await getProduct(id);

  if (!product) notFound();

  const fixedPrice = Number(product.plant_price).toFixed(2);

  return (
    <>
      {/* Location PATH */}
      <p className="dark:bg-secondary flex items-center gap-1 pt-6 px-4 sm:px-8 lg:px-20">
        <span className="text-gray-500">Home</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-gray-500">Products</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-font capitalize dark:text-white">
          {product.plant_name}
        </span>
      </p>

      <div className="dark:bg-secondary pt-10 pb-20 grid grid-cols-4 gap-5 px-4 sm:px-8 lg:px-20">
        {product.img_url ? (
          <div className="col-span-4 lg:col-span-2 flex justify-center lg:justify-start max-h-[500px]">
            <Image
              className="object-cover aspect-square"
              src={product.img_url}
              alt={product.plant_name}
              priority
              width={570}
              height={400}
              quality={100}
            />
          </div>
        ) : (
          <div className="border-b border-input overflow-hidden rounded w-[570px] h-[635px] bg-gray-100 flex justify-center items-center col-span-4 lg:col-span-2 lg:justify-start">
            <div className="flex justify-center items-center w-full">
              <Icons.image width={40} height={40} className="text-gray-500" />
            </div>
          </div>
        )}

        <div className="col-span-4 lg:col-span-2 pt-2">
          <h2 className="text-font dark:text-white text-2xl font-bold capitalize">
            {product.plant_name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 py-2">
            &#36;{fixedPrice}
          </p>
          <Link
            href={`/products?categories=${product.plant_category}`}
            className="text-gray-600 dark:text-gray-400 hover:underline hover:underline-offset-2 capitalize text-lg"
          >
            {product.plant_category}
          </Link>

          <div className="border-b border-input dark:border-secondary my-6" />

          <div className="pick-color pb-4">
            <p className="text-font dark:text-white font-semibold text-lg pb-2">
              Plant Pot Color
            </p>

            <label className="lime">
              <input
                type="radio"
                name="color"
                className="hidden" // HIDDEN
                readOnly
              />
              <div className="inline-block relative w-7 h-7 m-2 cursor-pointer">
                <span className="absolute w-7 h-7 p-0 rounded-full hover:p-2 bg-green-500 "></span>
              </div>
            </label>

            <label className="indigo">
              <input
                type="radio"
                name="color"
                className="hidden" // HIDDEN
                readOnly
              />
              <div className="inline-block relative w-7 h-7 m-2 cursor-pointer">
                <span className="absolute w-7 h-7 p-0 rounded-full hover:p-2 bg-[#3f51b5] "></span>
              </div>
            </label>

            <label className="blue">
              <input
                type="radio"
                name="color"
                className="hidden" // HIDDEN
                readOnly
              />
              <div className="inline-block relative w-7 h-7 m-2 cursor-pointer">
                <span className="absolute w-7 h-7 p-0 rounded-full hover:p-2 bg-[#2196f3] "></span>
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-font dark:text-white font-semibold text-lg">
              Quantity
            </p>
            <input
              type="number"
              className="bg-white dark:bg-secondary border border-input dark:border-secondary rounded outline-none px-1.5 py-1 h-8 w-14 text-sm"
              value={1}
              readOnly
            />

            <AddToCart product={product} />
          </div>

          <div className="border-b border-input dark:border-secondary my-6" />

          {/* Description */}
          <div>
            <ProductDescription {...product} />
          </div>
        </div>
      </div>
    </>
  );
}
