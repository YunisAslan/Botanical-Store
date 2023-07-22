"use client";

import { Button } from "./ui/Button";
import { Icons } from "./Icons";

function Subscribe() {
  return (
    <div className="dark:bg-secondary pb-20">
      <div className="shadow-sm py-20 border-input dark:border-secondary border rounded flex flex-col items-center justify-center mx-4 sm:mx-8 lg:mx-20">
        <h2 className="text-2xl font-semibold text-primary dark:text-white text-center pb-5 px-6 sm:text-2xl lg:text-3xl">
          Join our newsletter to get the latest news and updates
        </h2>

        <form action="" className="flex items-center gap-5 relative">
          <input
            type="text"
            placeholder="botanical.store@gmail.com"
            className="outline-none text-font dark:text-white rounded w-60 sm:w-80 px-2 pr-16 py-2 shadow-sm border border-input dark:border-secondary dark:bg-secondary placeholder:text-sm md:placeholder:text-base"
          />

          <Button variant="primary" size="mm" className="absolute right-2">
            <Icons.send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Subscribe;
