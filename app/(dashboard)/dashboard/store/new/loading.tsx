export default function NewProductLoading() {
  return (
    <>
      <div className="pb-2 flex flex-col gap-2">
        <h6 className="bg-gray-300 w-24 h-7 animate-pulse rounded pb-1" />
        <p className="bg-gray-300 w-32 h-6 animate-pulse rounded" />
      </div>

      <div className="pt-10 flex flex-col w-full max-w-2xl gap-5">
        <div className="flex flex-col gap-3">
          <div className="bg-gray-300 w-16 h-6 animate-pulse rounded" />
          <div className="h-8 bg-gray-300 animate-pulse rounded" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="bg-gray-300 w-16 h-6 animate-pulse rounded" />
          <div className="h-24 bg-gray-300 animate-pulse rounded" />
        </div>

        <div className="flex w-full gap-5">
          <div className="w-1/2 flex flex-col gap-3">
            <div className="bg-gray-300 w-16 h-6 animate-pulse rounded" />
            <div className="p-2 bg-gray-300 w-80 h-8 animate-pulse rounded" />
          </div>

          <div className="w-1/2 flex flex-col gap-3">
            <div className="bg-gray-300 w-16 h-6 animate-pulse rounded" />
            <div className="p-2 bg-gray-300 w-80 h-8 animate-pulse rounded" />
          </div>
        </div>

        <div className="rounded-lg p-4 h-72 bg-gray-300 animate-pulse" />

        <div className="flex justify-start">
          <div className="bg-gray-300 w-32 h-6 animate-pulse rounded" />
        </div>
      </div>
    </>
  );
}
