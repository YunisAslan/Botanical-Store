import { Product } from "@/types";
import ProductCard from "./ProductCard";

function Products({ data }: { data: Product[] | undefined }) {
  return (
    <>
      {data?.map((item) => {
        return <ProductCard key={item.id} item={item} />;
      })}
    </>
  );
}

export default Products;
