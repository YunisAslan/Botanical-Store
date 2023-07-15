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
import { Toaster, toast } from "react-hot-toast";

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
    await toast.promise(deleteDoc(doc(db, "products", id)), {
      loading: "Deleted...",
      success: <b>Successfully deleted!</b>,
      error: <b>Could not save.</b>,
    });

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
        <Link
          className="flex items-center gap-2 hover:bg-inputBg px-2 rounded py-1 cursor-default"
          href={`/dashboard/store/product/${item.id}`}
          onClick={() => setIsOpen(false)}
        >
          <Icons.edit className="w-4 text-gray-500" />
          <span>Edit</span>
        </Link>
        {/*  */}
        <Link
          className="flex items-center gap-2 hover:bg-inputBg px-2 rounded py-1 cursor-default"
          href={`/product/${item.id}`}
          onClick={() => setIsOpen(false)}
        >
          <Icons.view className="w-4 text-gray-500" />
          <span>View</span>
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

      <Toaster />
    </>
  );
}

export default MoreMenu;
