import ProductTable from "@/components/ProductTable";
import SelectFilters from "@/components/SelectFilters";
import {
  getCategoryProducts,
  getFilteredProducts,
  getProducts,
  getSearchProducts,
} from "@/lib/products";
import { Product } from "@/types";
import { Suspense } from "react";

type PageProps = {
  searchParams: {
    q: string;
    sort_by: string;
    categories: string;
  };
};

async function Products({ searchParams }: PageProps) {
  // destructuring
  const { q, sort_by, categories } = searchParams;
  // all result
  const allProducts: Product[] | undefined = await getProducts();
  let filteredResults = allProducts;

  if (sort_by) {
    filteredResults = await getFilteredProducts(sort_by);
  } else if (categories) {
    filteredResults = await getCategoryProducts(categories);
  } else if (q) {
    filteredResults = await getSearchProducts(q);
  }

  const productIsNotFound =
    allProducts?.length === 0 || filteredResults?.length === 0;

  return (
    <Suspense>
      <div className="col-span-12 order-1 xl:col-span-9 xl:order-2">
        <div className="flex flex-col sm:flex-row justify-between items-center py-1">
          <h2 className="pb-3 sm:pb-0">
            Showing {filteredResults?.length} of {filteredResults?.length}{" "}
            results
          </h2>

          <SelectFilters />
        </div>

        {productIsNotFound ? (
          <div className="flex flex-col items-center text-center justify-center gap-2 h-1/2 py-10">
            <h6 className="text-xl md:text-2xl font-semibold">
              No products found
            </h6>
            <p className="text-gray-600 text-sm md:text-base">
              Try changing your filters, or check back later for new products
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-7 place-items-center xl:place-items-start gap-5 xl:gap-x-0 xl:gap-y-6">
            <ProductTable data={filteredResults} />
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default Products;
