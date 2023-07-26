"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";

function MobileNav() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [sideBar, setSideBar] = useState<boolean>(false);

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
        name="Mobile Menu"
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
          "fixed top-0 bottom-0 left-0 w-full h-full flex lg:hidden duration-300 transition-all ease-out overflow-x-hidden -translate-x-full invisible z-10 opacity-0",
          isOpen && "-translate-x-0 visible opacity-100"
        )}
      >
        <div
          ref={menuRef}
          className="w-3/4 bg-white dark:bg-secondary relative border-r border-input dark:border-secondary overflow-auto"
        >
          <div className="py-5 px-8">
            <Button
              name="Close Menu"
              className="absolute right-3"
              variant="ghost"
              size="mm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.X className="w-5 h-5 text-gray-600 dark:text-white" />
            </Button>

            <Link
              aria-label="site logo"
              href="/"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.logo className="w-16" />
            </Link>

            <nav
              className={cn(
                "flex flex-col pt-10 gap-4 opacity-0 duration-500 ease-in-out transition-opacity",
                isOpen && "opacity-100"
              )}
            >
              {docsConfig.mainNav.map((item, index) => (
                <Link
                  className={cn(
                    "font-semibold text-base text-primary dark:text-white hover:text-primary duration-500 transition-colors pb-4 border-b border-input dark:border-secondary hover:dark:border-input",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {item.title}
                </Link>
              ))}

              {/* Sidebar menu */}
              <div className="w-full border-b border-input dark:border-secondary hover:dark:border-input">
                <button
                  className="flex justify-between items-center font-semibold text-base text-primary dark:text-white hover:text-primary duration-500 transition-colors pb-4 hover:dark:border-input w-full"
                  onClick={() => setSideBar(!sideBar)}
                >
                  <span>Sidebar Menu</span>
                  <Icons.chevronDown
                    className={cn(
                      "w-4 duration-500 transition-transform",
                      sideBar && "-rotate-180"
                    )}
                  />
                </button>
                <div className="flex flex-col items-start w-full cursor-auto">
                  {sideBar &&
                    docsConfig.dashboardNav.map((item, index) => (
                      <Link
                        className={cn(
                          "font-semibold text-sm text-gray-500 dark:text-white hover:text-primary duration-500 transition-colors py-2 dark:border-secondary hover:dark:border-input w-full items-start",
                          item.disabled && "cursor-not-allowed opacity-80"
                        )}
                        key={index}
                        href={item.disabled ? "#" : item.href}
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        {item.title}
                      </Link>
                    ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div
          className={cn(
            "opacity-0 backdrop-blur-sm w-1/4 duration-700 transition-all ease-out bg-white/40 dark:bg-secondary/10",
            isOpen && "opacity-100"
          )}
        />
      </div>
    </>
  );
}

export default MobileNav;
