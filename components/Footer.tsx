"use client";

import Link from "next/link";
import { Icons } from "./Icons";
import { Button, buttonVariants } from "./ui/Button";
import { siteConfig } from "@/config/site";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

function Footer() {
  const mounted = useMounted();
  const { theme, setTheme } = useTheme();

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <footer className="flex flex-col border-t border-input dark:border-secondary justify-between items-center py-4 sm:flex-row px-4 sm:px-8 lg:px-20 dark:bg-secondary container mx-auto max-w-[84rem]">
      <p className="flex gap-2 dark:text-white">
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
          aria-label="github profile"
          href={siteConfig.github}
          target="_blank"
          className={buttonVariants({
            variant: "ghost",
            size: "mm",
          })}
        >
          <Icons.github />
        </Link>

        {mounted && (
          <Button
            name="dark/light mode"
            variant="ghost"
            size="mm"
            onClick={handleTheme}
          >
            {theme === "light" ? <Icons.sun /> : <Icons.moon />}
          </Button>
        )}
      </div>
    </footer>
  );
}

export default Footer;
