"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";
import HeroImg from "@/public/assets/images/hero-img2.png";

function Hero() {
  return (
    <section className="grid grid-cols-12 pt-20 items-center lg:pt-6 px-4 sm:px-8 lg:px-16 dark:bg-secondary">
      <div className="hero-left-side col-span-12 xl:col-span-6 text-center pb-14 xl:text-left lg:pb-0">
        <h2 className="text-4xl font-bold py-2 xl:max-w-md text-primary dark:text-white capitalize lg:text-6xl">
          Plants make people happy.
        </h2>
        <p className="text-base text-gray-600 xl:max-w-md dark:text-gray-400 pt-2 pb-7 lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          tempora.
        </p>
        <Link
          href="/products"
          className={buttonVariants({
            variant: "primary",
            size: "default",
            className: "group mx-auto xl:mx-0 w-24 xl:w-28",
          })}
        >
          Shop
          <Icons.arrowRight className="w-5 ml-2 group-hover:translate-x-1 duration-500 transition-transform" />
        </Link>
      </div>

      <div className="hero-right-side hidden sm:flex col-span-12 justify-center xl:col-span-6 xl:inline-block pl-0 xl:pl-10">
        <Icons.logo className="" />
      </div>
    </section>
  );
}

export default Hero;
