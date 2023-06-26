"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import Logo from "@/public/assets/images/logo.png";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";

function MobileNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        className="inline-flex lg:hidden"
        variant="ghost"
        size="mm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.menu />
      </Button>

      <div
        className={cn(
          "off-canvas fixed inset-0 w-0 h-full flex lg:hidden duration-300 transition-all ease-out overflow-x-hidden",
          isOpen && "w-full"
        )}
      >
        <div className="w-3/4 bg-white relative border-r border-input">
          <div className="pt-3 px-8">
            <Button
              className="absolute right-3"
              variant="ghost"
              size="mm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.X className="w-5 h-5 text-gray-600" />
            </Button>

            <div className="flex">
              <Link href="/" className="flex-shrink-0">
                <Image
                  className={cn(
                    "opacity-0 duration-500 transition-all ease-in-out",
                    isOpen && "opacity-100"
                  )}
                  src={Logo}
                  alt="Botanical Plant Store"
                  priority
                  width={110}
                  height={20}
                />
              </Link>
            </div>

            <nav
              className={cn(
                "flex flex-col pt-10 gap-4 opacity-0 duration-500 ease-in-out transition-opacity",
                isOpen && "opacity-100"
              )}
            >
              {docsConfig.mainNav.map((item, index) => (
                <Link
                  className={cn(
                    "font-semibold text-base text-font hover:text-primary2 duration-500 transition-colors pb-4 border-b whitespace-nowrap",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                  key={index}
                  href={item.disabled ? "#" : item.href}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 backdrop-blur-sm w-1/4 duration-700 transition-all ease-out",
            isOpen && "opacity-100"
          )}
        ></div>
      </div>
    </>
  );
}

export default MobileNav;
