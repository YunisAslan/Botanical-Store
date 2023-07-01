import { getProduct } from "@/lib/products";

type Props = {
  params: {
    id: string;
  };
};

function ProductDetail({ params: { id } }: Props) {
  const oneData = getProduct(id);

  console.log(oneData);

  return <div>ProductDetail</div>;
}

export default ProductDetail;
