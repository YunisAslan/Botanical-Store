"use client";

import Link from "next/link";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

function MainNav() {
  return (
    <nav className="hidden flex-1 items-center gap-2 pl-7 lg:flex">
      {docsConfig.mainNav.map((item, index) => (
        <Link
          className={cn(
            "font-semibold text-base text-font dark:text-white hover:text-primary duration-500 transition-colors dark:hover:bg-slight/70 px-2 py-1 rounded",
            item.disabled && "cursor-not-allowed opacity-80"
          )}
          key={index}
          href={item.disabled ? "#" : item.href}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default MainNav;
