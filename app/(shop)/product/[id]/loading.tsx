function ProductLoading() {
  return (
    <>
      {/* Location PATH LOADING */}
      <p className="flex items-center gap-4 pt-6 px-4 sm:px-8 lg:px-20">
        <span className="bg-gray-300 dark:bg-slight/70 w-16 h-6 animate-pulse rounded" />
        <span className="bg-gray-300 dark:bg-slight/70 w-16 h-6 animate-pulse rounded" />
        <span className="bg-gray-300 dark:bg-slight/70 w-16 h-6 animate-pulse rounded" />
      </p>

      <div className="pt-10 pb-20 grid grid-cols-4 gap-5 px-4 sm:px-8 lg:px-20">
        <div className="col-span-4 lg:col-span-2 flex justify-center lg:justify-start">
          <div className="w-[570px] h-[630px] bg-gray-300 dark:bg-slight/70 animate-pulse rounded" />
        </div>

        <div className="col-span-4 lg:col-span-2 pt-2 space-y-3">
          <h2 className="bg-gray-300 dark:bg-slight/70 w-28 h-8 animate-pulse rounded" />
          <p className="bg-gray-300 dark:bg-slight/70 w-16 h-8 animate-pulse rounded py-2" />
          <div className="bg-gray-300 dark:bg-slight/70 w-16 h-8 animate-pulse rounded" />

          <div className="border-b border-input dark:border-secondary my-6" />

          <div className="pick-color pb-4">
            <p className="bg-gray-300 dark:bg-slight/70 w-16 h-6 animate-pulse rounded" />
          </div>

          <div className="flex flex-col gap-3">
            <p className="bg-gray-300 dark:bg-slight/70 w-24 h-7 animate-pulse rounded" />
            <div className="w-32 bg-gray-300 dark:bg-slight/70 h-7 animate-pulse rounded outline-none px-2 py-1" />

            <div className="bg-gray-300 dark:bg-slight/70 w-[585px] h-9 animate-pulse rounded" />
          </div>

          <div className="border-b border-input dark:border-secondary my-6" />

          <div className="space-y-3">
            <p className="bg-gray-300 dark:bg-slight/70 w-24 h-7 animate-pulse rounded pb-2" />

            <p className="bg-gray-300 dark:bg-slight/70 w-24 h-7 animate-pulse rounded" />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductLoading;
