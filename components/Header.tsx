import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import SearchProduct from "./SearchProduct";
import { buttonVariants } from "./ui/Button";
import Navbar from "./MainNav";
import MobileNav from "./MobileNav";
import CartBar from "./CartBar";

function Header() {
  return (
    <header className="flex items-center justify-between px-5 py-0 h-20 md:px-10 border-b border-input">
      <MobileNav />

      <Link href="/">
        <Image
          className="pb-4 pt-1 hidden lg:flex"
          src={Logo}
          alt="Botanical Plant Store"
          priority
          width={120}
          height={30}
        />
      </Link>

      <Navbar />

      <div className="flex items-center gap-2">
        <SearchProduct />

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
