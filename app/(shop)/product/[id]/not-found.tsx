import { Icons } from "@/components/Icons";
import Link from "next/link";

function SingleProductNotFound() {
  return (
    <div className="h-screen flex justify-center items-start pt-32 dark:bg-secondary">
      <div className="rounded-md flex flex-col items-center border border-input dark:border-secondary">
        <div className="p-7">
          <Icons.warning className="w-10 h-10 dark:text-white" />
        </div>

        <div className="text-center px-6 pb-6 pt-3">
          <h2 className="font-semibold text-2xl text-font dark:text-white pb-3">
            Product not found
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs">
            The product may have expired or you may have already updated your
            product
          </p>
        </div>

        <Link
          href="/"
          className="font-semibold text-base text-font dark:text-white hover:text-primary duration-500 transition-colors dark:hover:bg-slight/70 px-2 py-1 rounded mb-6"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default SingleProductNotFound;
