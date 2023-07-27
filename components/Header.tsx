import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import MainNav from "./MainNav";
import MobileNav from "./MobileNav";
import CartBar from "./CartBar";

import { Icons } from "./Icons";
import GlobalSearch from "./GlobalSearch";

function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-0 h-20 md:px-10 border-b border-input dark:bg-secondary dark:border-secondary sticky top-0 z-[40] bg-white">
      <MobileNav />

      <Link aria-label="site logo" href="/" className="hidden lg:flex">
        <Icons.logo className="w-16" />
      </Link>

      <MainNav />

      <div className="flex items-center gap-2">
        <GlobalSearch />

        <CartBar />

        <Link
          style={{ cursor: "not-allowed" }}
          href="#"
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
