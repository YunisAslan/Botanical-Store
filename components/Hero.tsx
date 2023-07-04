"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";
// import HeroImg from "@/public/assets/images/hero-img.png";
import HeroImg from "@/public/assets/images/hero-img2.png";

function Hero() {
  return (
    <section className="grid grid-cols-12 pt-20 items-center lg:pt-6">
      <div className="hero-left-side col-span-12 xl:col-span-5 text-center pb-14 xl:text-left lg:pb-0">
        <h2 className="text-4xl font-bold py-2 text-primary capitalize lg:text-6xl">
          Plants make people happy.
        </h2>
        <p className="text-base text-gray-600 pt-2 pb-7 lg:text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias,
          tempora.
        </p>
        <Link
          href="/shop"
          className={buttonVariants({
            variant: "primary",
            size: "default",
            className: "group mx-auto xl:mx-0 w-28",
          })}
        >
          Shop
          <Icons.arrowRight className="w-5 ml-2 group-hover:translate-x-1 duration-500 transition-transform" />
        </Link>
      </div>

      <div className="hero-right-side hidden sm:flex  col-span-12 justify-center xl:col-span-7 xl:inline-block pl-0 xl:pl-10">
        <Image
          className="object-contain"
          src={HeroImg}
          alt="Plants make people happy"
          quality={100}
          priority
          width={700}
          height={700}
        />
      </div>
    </section>
  );
}

export default Hero;
