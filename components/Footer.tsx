import Link from "next/link";
import { Icons } from "./Icons";
import { Button, buttonVariants } from "./ui/Button";
import { siteConfig } from "@/config/site";

function Footer() {
  return (
    <footer className="flex flex-col justify-between items-center py-4 sm:flex-row px-4 sm:px-8 lg:px-20">
      <p className="flex gap-2">
        <Icons.fingerPrint />
        Built by
        <a
          href={siteConfig.linkedin}
          target="_blank"
          className="font-medium underline underline-offset-4"
        >
          Yunis Aslan
        </a>
      </p>

      <div className="flex items-center gap-2 pt-3 sm:pt-0">
        <Link
          href={siteConfig.github}
          target="_blank"
          className={buttonVariants({
            variant: "ghost",
            size: "mm",
          })}
        >
          <Icons.github />
        </Link>

        <Button variant="ghost" size="mm">
          <Icons.sun />
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
