import Link from "next/link";
import SearchProducts from "./SearchProducts";
import { buttonVariants } from "./ui/Button";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import CartBar from "./CartBar";

import { Icons } from "./Icons";

function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-0 h-20 md:px-10 border-b border-input dark:bg-secondary dark:border-secondary sticky top-0 z-[40] bg-white">
      <MobileNav />

      <Link href="/" className="hidden lg:flex">
        <Icons.logo className="w-16" />
      </Link>

      <MainNav />

      <div className="flex items-center gap-2">
        <SearchProducts />

        <CartBar />

        <Link
          href="/signin"
          className={buttonVariants({
            variant: "primary",
            size: "sm",
          })}
        >
          <span>Sign In</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
