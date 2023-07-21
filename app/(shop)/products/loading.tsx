export default function ProductsLoading() {
  return (
    <div className="col-span-12 order-1 xl:col-span-9 xl:order-2">
      <div className="flex justify-between items-center py-1">
        <div className="bg-gray-300 dark:bg-slight/70 w-40 h-6 animate-pulse rounded" />
        <div className="bg-gray-300 dark:bg-slight/70 w-40 h-8 animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-7 place-items-center xl:place-items-start gap-5 xl:gap-x-0 xl:gap-y-4">
        {[...Array.from(Array(6).keys())].map((_, i) => (
          <div key={i} className="bg-white rounded w-64 border-input shadow-xl">
            <div className="h-64 border-b border-input overflow-hidden rounded relative bg-gray-300 dark:bg-slight/70 animate-pulse" />

            <div className="p-4 space-y-3">
              <h2 className="h-6 w-40 bg-gray-300 dark:bg-slight/70 rounded animate-pulse pb-1" />
              <span className="h-5 bg-gray-300 dark:bg-slight/70 rounded animate-pulse" />
            </div>

            <div
              className="p-4 flex justify-center gap-4"
              style={{
                animationDelay: `${i * 0.03}s`,
                animationDuration: ".6s",
              }}
            >
              <div className="w-20 h-8 bg-gray-300 dark:bg-slight/70 rounded animate-pulse" />
              <div className="w-28 h-8 bg-gray-300 dark:bg-slight/70 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
