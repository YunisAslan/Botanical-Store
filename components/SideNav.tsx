"use client";

import { docsConfig } from "@/config/docs";
import Link from "next/link";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-72 hidden min-h-full py-8 pr-6 xl:inline-block border-r border-input dark:border-secondary">
      {docsConfig.dashboardNav.map((item, index) => {
        const Icon = Icons[item.icon ?? "X"];

        return (
          <div key={index} className="flex flex-col space-y-8">
            <Link
              key={index}
              aria-disabled={item.disabled}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "font-semibold text-base text-gray-400 hover:bg-inputBg dark:hover:bg-slight/70 hover:text-primary dark:hover:text-white duration-500 transition-colors px-3 rounded py-1.5 my-1 flex gap-2 items-center",
                item.disabled && "cursor-not-allowed",
                pathname === item.href &&
                  "bg-inputBg dark:bg-slight/70 text-primary dark:text-white font-medium"
              )}
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default SideNav;
