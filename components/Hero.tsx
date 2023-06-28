"use client";

import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { Icons } from "./Icons";

// for Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const heroItems = [
  {
    title: "Plants gonna make people happy",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, tempora.",
    src: "/assets/images/hero-img1.png",
  },
  {
    title: "Plants for healthy",
    detail: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    src: "/assets/images/hero-img2.png",
  },
  {
    title: "Houseplant the perfect choice",
    detail:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis delectus necessitatibus quis?",
    src: "/assets/images/hero-img2.png",
  },
];

function Hero() {
  return (
    <Swiper
      rewind={true}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {heroItems.map((item) => (
        <SwiperSlide key={item.title}>
          <section className="grid grid-cols-5 px-24 pt-5 pb-28 items-center h-screen">
            <div className="hero-left-side col-span-2 min-w-[32rem]">
              <h2 className="text-5xl font-bold text-font capitalize">
                {item.title}
              </h2>
              <p className="pt-4 pb-6">{item.detail}</p>
              <Link
                href="/shop"
                className={buttonVariants({
                  variant: "primary",
                  size: "default",
                  className: "group",
                })}
              >
                Shop
                <Icons.arrowRight className="w-5 ml-2 group-hover:translate-x-1 duration-500 transition-transform" />
              </Link>
            </div>

            <div className="hero-right-side col-span-3 -z-10 pl-20">
              <Image
                className="object-contain"
                /* nullish coalescing (??) (temporary)*/
                src={item.src}
                alt={item.title}
                quality={100}
                priority
                width={900}
                height={770}
              />
            </div>
          </section>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Hero;
