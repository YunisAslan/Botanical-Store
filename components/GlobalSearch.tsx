import { getProducts } from "@/lib/products";
import SearchProduct from "./SearchProducts";
import { notFound } from "next/navigation";

async function GlobalSearch() {
  const products = await getProducts();

  if (!products) return notFound();

  return (
    <div>
      <SearchProduct products={products} />
    </div>
  );
}

export default GlobalSearch;
