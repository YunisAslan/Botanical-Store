import PaginationBar from "@/components/PaginationBar";
import Products from "@/components/Products";
import SelectFilters from "@/components/SelectFilters";
import {
  getCategoryProducts,
  getFilteredProducts,
  getProducts,
  getSearchProducts,
} from "@/lib/products";
import { Product } from "@/types";

type PageProps = {
  searchParams: {
    q: string;
    sort_by: string;
    categories: string;
    page: string;
  };
};

async function ProductsPage({
  searchParams: { page = "1", q, sort_by, categories },
}: PageProps) {
  // destructuring
  // const { q, sort_by, categories } = searchParams;

  const currentPage = parseInt(page);
  const pageSize = 6;

  const allProducts: Product[] | undefined = await getProducts();
  let filteredResults = allProducts;

  if (sort_by) {
    filteredResults = await getFilteredProducts(sort_by);
  } else if (categories) {
    filteredResults = await getCategoryProducts(categories);
  } else if (q) {
    filteredResults = await getSearchProducts(q);
  }

  const totalItemCount = filteredResults?.length || 0;
  const totalPages = Math.ceil(totalItemCount / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItemCount);
  const displayedProducts = filteredResults?.slice(startIndex, endIndex) || [];

  const productIsNotFound = allProducts?.length === 0 || totalItemCount === 0;

  return (
    <div className="col-span-12 order-1 xl:col-span-9 xl:order-2">
      <div className="flex flex-col sm:flex-row justify-between items-center py-1">
        <h2 className="pb-3 sm:pb-0">
          Showing {filteredResults?.length} of {filteredResults?.length} results
        </h2>

        <SelectFilters />
      </div>

      {productIsNotFound ? (
        <div className="flex flex-col items-center text-center justify-center gap-2 h-3/4 py-10">
          <h6 className="text-xl md:text-2xl font-semibold">
            No products found
          </h6>
          <p className="text-gray-600 text-sm md:text-base">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-7 place-items-center xl:place-items-start gap-5 xl:gap-x-0 xl:gap-y-6">
            <Products data={displayedProducts} />
          </div>

          <div className="flex justify-center mt-8">
            <PaginationBar currentPage={currentPage} totalPages={totalPages} />
          </div>
        </>
      )}
    </div>
  );
}

export default ProductsPage;
