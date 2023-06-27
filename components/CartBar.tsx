"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useEffect, useRef, useState } from "react";

function CartBar() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const cartBar = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        cartBar.current &&
        !cartBar.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
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
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.cart className="w-5 h-5" />
      </Button>

      <div
        className={cn(
          "w-0 fixed flex right-0 h-full top-0 bottom-0 duration-300 transition-all ease-out",
          isOpen && "w-full"
        )}
      >
        <div
          className={cn(
            "w-0 backdrop-blur-sm md:w-1/4 opacity-0 duration-700 transition-all ease-out bg-white/40",
            isOpen && "opacity-100"
          )}
        />

        <div
          ref={cartBar}
          className="bg-white relative w-full border-l border-input md:w-3/4 overflow-auto"
        >
          <div
            className={cn(
              "pt-3 px-8 pb-4 relative duration-500 opacity-0 ease-in-out transition-opacity",
              isOpen && "opacity-100"
            )}
          >
            <Button
              className="absolute right-3"
              variant="ghost"
              size="mm"
              onClick={() => setIsOpen(!open)}
            >
              <Icons.X className="w-5 h-5 text-gray-600" />
            </Button>

            <h6 className="text-xl text-center font-semibold text-font pt-5 pb-4 md:text-left">
              Cart
            </h6>

            <div className="border-b border-input absolute left-7 right-0" />
          </div>

          <div className="product-container flex items-center justify-center flex-col h-3/4">
            <Icons.cart className="w-14 h-14 text-gray-500" />
            <span className="text-gray-500 pt-2 font-semibold text-lg whitespace-nowrap">
              Your cart is empty
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartBar;
