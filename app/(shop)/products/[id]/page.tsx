import { Icons } from "@/components/Icons";
import { getProduct } from "@/lib/products";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function ProductDetail({ params: { id } }: Props) {
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <>
      {/* Location PATH */}
      <p className="flex items-center gap-1 pt-6">
        <span className="text-gray-500">Home</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-gray-500">Products</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-font">{product?.plant_name}</span>
      </p>

      <div className="pt-10 pb-20">
        <div>
          <Image
            src={product?.img_url}
            alt={product?.plant_name}
            width={500}
            height={400}
            quality={100}
          />
        </div>
        <h2>{product?.plant_name}</h2>
      </div>
    </>
  );
}
