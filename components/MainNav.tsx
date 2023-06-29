import Link from "next/link";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

function Navbar() {
  return (
    <nav className="hidden flex-1 items-center gap-5 pl-7 lg:flex">
      {docsConfig.mainNav.map((item, index) => (
        <Link
          className={cn(
            "font-semibold text-base text-font hover:text-primary duration-500 transition-colors",
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

export default Navbar;
