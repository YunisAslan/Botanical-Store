import { Icons } from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import SelectFilters from "@/components/SelectFilters";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/lib/products";

async function Products() {
  const products = await getProducts();

  return (
    <>
      {/* Location PATH */}
      <p className="flex items-center gap-1 pt-6">
        <span className="text-gray-500">Home</span>
        <Icons.chevronRight className="text-gray-500 w-4 h-4" />
        <span className="text-font">Products</span>
        {/* <Icons.chevronRight className="text-gray-500 w-4 h-4" /> */}
      </p>

      <div className="grid grid-cols-12 gap-6 pt-10 pb-20">
        <div className="left-side col-span-12 order-2 xl:col-span-3 xl:order-1">
          {/* LEFT SIDE SEARCH BAR for Products */}
          <SearchBar />

          <div className="pt-6">
            <h2 className="text-xl font-semibold pb-2">Categories</h2>

            <ul className="flex flex-col gap-1">
              <li>Cactus</li>
              <li>Aloe Vera</li>
              <li>Roses</li>
              <li>Orchids</li>
            </ul>
          </div>

          <div className="pt-6">
            <h6 className="text-xl font-semibold pb-3">Filter by price</h6>

            <form action="">
              <input type="range" min={1} max={100} className="slider" />
            </form>

            <p className="text-gray-600 pt-2">Price: &#36;50 - &#36;70</p>
          </div>
        </div>

        <div className="right-side col-span-12 order-1 xl:col-span-9 xl:order-2">
          <div className="flex justify-between items-center py-1">
            <h2>
              Showing {products?.length} of {products?.length} results
            </h2>

            <SelectFilters />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-7 place-items-center xl:place-items-start gap-5 xl:gap-x-0 xl:gap-y-4">
            {products?.map((item) => {
              return <ProductCard key={item.id} item={item} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
