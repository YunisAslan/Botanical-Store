import { getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "./Icons";

async function TopRate() {
  const products = await getProducts();
  const filteredProducts = products?.slice(0, 4);

  return (
    <div className="pt-6">
      <h6 className="text-xl font-semibold pb-5">Top rate</h6>

      <div className="flex flex-col gap-y-5">
        {products ? (
          filteredProducts?.map((item) => (
            <div className="flex" key={item.id}>
              {item.img_url ? (
                <div>
                  <Image
                    src={item.img_url}
                    alt={item.plant_name}
                    width={80}
                    height={80}
                    className="object-cover w-20 h-20"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 bg-gray-100 flex justify-center items-center">
                  <Icons.image
                    width={20}
                    height={20}
                    className="text-gray-500"
                  />
                </div>
              )}
              <div className="pl-3">
                <Link
                  href={`/product/${item.id}`}
                  className="font-semibold text-base pb-1 capitalize"
                >
                  {item.plant_name}
                </Link>
                <p className="text-gray-600 dark:text-gray-400 text-sm pt-1">
                  &#36;{item.plant_price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="w-20 h-20 bg-gray-100 flex justify-center items-center">
              <Icons.image width={20} height={20} className="text-gray-500" />
            </div>
            <div className="w-20 h-20 bg-gray-100 flex justify-center items-center">
              <Icons.image width={20} height={20} className="text-gray-500" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TopRate;
