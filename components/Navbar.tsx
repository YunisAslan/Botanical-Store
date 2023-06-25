import Image from "next/image";
import Logo from "@/public/assets/images/logo.png";
import { Icons } from "./Icons";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/Button";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-16 py-6">
      <Link href="/">
        <Image
          className="pb-5"
          src={Logo}
          alt="Botanical Plant Store"
          priority
          width={165}
          height={64}
        />
      </Link>

      <ul className="flex flex-1 items-center gap-5 text-xl pl-7">
        <Link href="/">Home</Link>
        <Link href="/shop">Shop</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/tech-stack">Tech Stack</Link>
        <Link href="/contact">Contact</Link>
      </ul>

      <div className="flex items-center gap-5">
        <div>
          <input type="text" className="px-2 py-1 w-40 border" />
          <Icons.search />
        </div>

        <Icons.cart />

        <Link
          href="/"
          className={buttonVariants({
            size: "sm",
          })}
        >
          Maria
        </Link>

        <Button className="bg-gray-500" variant="default" size="sm">
          Any
        </Button>

        <Icons.heart />
      </div>
    </nav>
  );
}

export default Navbar;
