"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/Button";
import { Icons } from "./Icons";
import { useEffect, useRef, useState } from "react";
import { useProductStore } from "@/store/use-product-store";
import CartItem from "./CartItem";
import { useMounted } from "@/hooks/use-mounted";

function CartBar() {
  const mounted = useMounted();
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const { products, totalQuantity, totalPrice, calculateTotalItems } =
    useProductStore();

  useEffect(() => {
    calculateTotalItems();
  }, [products]);
  // console.log(totalQuantity);

  const quantityBadge = totalQuantity !== 0 && (
    <span className="text-sm text-primary bg-inputBg flex justify-center items-center rounded-full w-5 h-5 absolute -top-2 -right-1">
      {totalQuantity}
    </span>
  );

  return (
    <>
      <Button
        name="Shopping Cart"
        ref={btnRef}
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        {mounted && quantityBadge}
        <Icons.cart className="w-5 h-5" />
      </Button>

      {/* this time i use translate instead w-0/full */}
      <div
        className={cn(
          "w-full fixed flex right-0 h-full top-0 bottom-0 duration-300 transition-all ease-out translate-x-full invisible z-10 opacity-0",
          isOpen && "-translate-x-0 visible opacity-100"
        )}
      >
        <div
          className={cn(
            "w-0 backdrop-blur-sm md:w-3/4 opacity-0 duration-700 transition-all ease-out bg-white/40 dark:bg-secondary/10",
            isOpen && "opacity-100"
          )}
        />

        <div
          ref={cartBar}
          className="bg-white dark:bg-secondary relative w-full border-l border-input dark:border-secondary/0 overflow-hidden md:dark:border-secondary"
        >
          <div
            className={cn(
              "pt-3 px-8 relative duration-500 opacity-0 ease-in-out transition-opacity",
              isOpen && "opacity-100"
            )}
          >
            <Button
              name="Close Cart"
              className="absolute right-3"
              variant="ghost"
              size="mm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Icons.X className="w-5 h-5 text-gray-600 dark:text-white" />
            </Button>

            {mounted && (
              <h6 className="text-xl text-center font-semibold text-primary dark:text-white pt-5 pb-4 md:text-left">
                Cart {totalQuantity !== 0 && <span>({totalQuantity})</span>}
              </h6>
            )}

            <div className="border-b border-input dark:border-secondary absolute left-7 right-0" />
          </div>

          {mounted && (
            <>
              {products.length === 0 && (
                <div className="flex items-center justify-center flex-col h-3/4">
                  <Icons.cart className="w-14 h-14 text-gray-500" />
                  <span className="text-gray-500 pt-2 font-semibold text-lg whitespace-nowrap">
                    Your cart is empty
                  </span>
                </div>
              )}

              <div className="px-7 overflow-auto h-[60%]">
                {products.map((item) => {
                  return <CartItem key={item.id} item={item} />;
                })}
              </div>
            </>
          )}

          <div className="owerflow-hidden pt-3 px-7 font-medium">
            <div className="w-full py-4 border-t border-input dark:border-secondary">
              <div className="flex flex-col justify-between space-y-2">
                <div className="flex justify-between items-center">
                  <h6 className="line-clamp-1 text-sm">Shipping</h6>
                  <p className="line-clamp-1 text-sm">Free</p>
                </div>

                <div className="flex justify-between items-center pb-3">
                  <h6 className="line-clamp-1 text-sm">Taxes</h6>
                  <p className="line-clamp-1 text-sm">Calculated at checkout</p>
                </div>
              </div>

              {mounted && (
                <div className="flex justify-between items-center border-t border-input dark:border-secondary py-3">
                  <h6 className="line-clamp-1 text-sm">Total</h6>
                  <p className="line-clamp-1 text-sm">
                    &#36;{totalPrice.toFixed(2)}
                  </p>
                </div>
              )}

              <Button variant="primary" size="sm" className="w-full">
                Proceed to Checkout
              </Button>
            </div>
          </div>
          {/*  */}
        </div>
      </div>
    </>
  );
}

export default CartBar;
