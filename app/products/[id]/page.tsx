import { getProduct } from "@/lib/products";

type Props = {
  params: {
    id: string;
  };
};

async function ProductDetail({ params: { id } }: Props) {
  const product = await getProduct(id);

  return (
    <div>
      <h2>{product?.plant_name}</h2>
    </div>
  );
}

export default ProductDetail;
