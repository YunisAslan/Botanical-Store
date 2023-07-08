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

async function Products({
  searchParams: { q, sort_by, categories },
}: PageProps) {
  // all result
  const allProducts = await getProducts();
  // search result
  const searchResults = await getSearchProducts(q);
  // filter result
  // const filteredResults = await getFilteredProducts(sort_by);
  let filteredResults: Product[] | undefined = allProducts;
  if (sort_by) {
    filteredResults = await getFilteredProducts(sort_by);
  } else if (categories) {
    filteredResults = await getCategoryProducts(categories);
  }

  const productIsNotFound =
    allProducts?.length === 0 || (q && searchResults?.length === 0);

  return (
    <Suspense>
      <div className="right-side col-span-12 order-1 xl:col-span-9 xl:order-2">
        <div className="flex justify-between items-center py-1">
          <h2>
            Showing {q ? searchResults?.length : filteredResults?.length} of{" "}
            {q ? searchResults?.length : filteredResults?.length} results
          </h2>

          <SelectFilters />
        </div>

        {productIsNotFound ? (
          <div className="flex flex-col items-center justify-center gap-2 h-3/4">
            <h6 className="text-2xl font-semibold">No products found</h6>
            <p className="text-gray-600">
              Try changing your filters, or check back later for new products
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-7 place-items-center xl:place-items-start gap-5 xl:gap-x-0 xl:gap-y-4">
            <ProductTable data={q ? searchResults : filteredResults} />
          </div>
        )}
      </div>
    </Suspense>
  );
}

export default Products;
