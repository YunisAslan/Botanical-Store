"use client";

import Link from "next/link";
import { Icons } from "./Icons";
import { Button, buttonVariants } from "./ui/Button";
import { siteConfig } from "@/config/site";
import { useEffect, useState } from "react";

function Footer() {
  const [theme, setTheme] = useState("light");

  const handleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [theme]);

  return (
    <footer className="flex flex-col justify-between items-center py-4 sm:flex-row px-4 sm:px-8 lg:px-20 dark:bg-secondary">
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
          href={siteConfig.github}
          target="_blank"
          className={buttonVariants({
            variant: "ghost",
            size: "mm",
          })}
        >
          <Icons.github />
        </Link>

        <Button variant="ghost" size="mm" onClick={handleTheme}>
          {theme === "light" ? <Icons.sun /> : <Icons.moon />}
        </Button>
      </div>
    </footer>
  );
}

export default Footer;
