import { getProducts } from "@/lib/products";
import Image from "next/image";
import Link from "next/link";

async function TopRate() {
  const products = await getProducts();
  const filteredProducts = products?.slice(0, 4);

  return (
    <div className="pt-6">
      <h6 className="text-xl font-semibold pb-5">Top rate</h6>

      <div className="flex flex-col gap-y-5">
        {filteredProducts?.map((item) => (
          <div className="flex">
            <div>
              <Image src={item.img_url} alt="" width={80} height={80} />
            </div>
            <div className="pl-3">
              <Link
                href={`/product/${item.id}`}
                className="font-semibold text-base pb-1 capitalize"
              >
                {item.plant_name}
              </Link>
              <p className="text-gray-600 text-sm pt-1">
                &#36;{item.plant_price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopRate;
