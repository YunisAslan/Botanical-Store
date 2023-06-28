"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import Logo from "@/public/assets/images/logo.png";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";

function MobileNav() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // change scroll behavior of the body when the menu is open or closed
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      <Button
        ref={btnRef}
        className="lg:hidden"
        variant="ghost"
        size="mm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.menu />
      </Button>

      <div
        className={cn(
          "off-canvas fixed top-0 bottom-0 left-0 w-full h-full flex lg:hidden duration-300 transition-all ease-out overflow-x-hidden -translate-x-full invisible z-10",
          isOpen && "-translate-x-0 visible"
        )}
      >
        <div
          ref={menuRef}
          className="w-3/4 bg-white relative border-r border-input overflow-auto"
        >
          <div className="pt-5 px-8">
            <Button
              className="absolute right-3"
              variant="ghost"
              size="mm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.X className="w-5 h-5 text-gray-600" />
            </Button>

            <div className="flex">
              <Link
                href="/"
                className="flex-shrink-0"
                onClick={() => setIsOpen(!isOpen)}
              >
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
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 backdrop-blur-sm w-1/4 duration-700 transition-all ease-out bg-white/40",
            isOpen && "opacity-100"
          )}
        ></div>
      </div>
    </>
  );
}

export default MobileNav;
