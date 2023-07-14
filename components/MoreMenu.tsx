"use client";

import { useEffect, useRef, useState } from "react";
import { Icons } from "./Icons";
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";

function MoreMenu({ item }: { item: Product }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, "products", id));

    router.refresh();
  };

  return (
    <>
      <Button
        ref={btnRef}
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icons.moreVertival className="w-4" />
      </Button>

      <div
        ref={menuRef}
        className={cn(
          "flex-col gap-y-1 absolute w-40 right-14 top-12 bg-white shadow-sm border border-input overflow-hidden rounded p-1 hidden z-10",
          isOpen && "flex"
        )}
      >
        <div className="flex items-center gap-2 hover:bg-inputBg px-2 rounded py-1 cursor-default">
          <Icons.edit className="w-4 text-gray-500" />
          <span>Edit</span>
        </div>
        {/*  */}
        <Link
          className="flex items-center gap-2 hover:bg-inputBg px-2 rounded py-1 cursor-default"
          onClick={() => setIsOpen(false)}
          href={`/product/${item.id}`}
        >
          <Icons.view className="w-4 text-gray-500" />
          <span> View</span>
        </Link>

        {/*  */}
        <button
          className="flex items-center gap-2 hover:bg-inputBg px-2 rounded py-1 cursor-default border-t"
          onClick={() => {
            deleteProduct(item.id as string), setIsOpen(false);
          }}
        >
          <Icons.delete className="w-4 text-gray-500" />
          <span>Delete</span>
        </button>
      </div>
    </>
  );
}

export default MoreMenu;
