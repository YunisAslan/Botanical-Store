"use client";

import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { Product } from "@/types";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function ActionsMenu({ itemId }: { itemId: string }) {
  const router = useRouter();

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
      <div className="flex items-center justify-center gap-3">
        <Link
          className={buttonVariants({ variant: "outline", size: "icon" })}
          href={`/dashboard/store/product/${itemId}`}
        >
          <Icons.edit className="w-4 text-gray-500" />
        </Link>

        <Link
          className={buttonVariants({ variant: "outline", size: "icon" })}
          href={`/product/${itemId}`}
        >
          <Icons.view className="w-4 text-gray-500" />
        </Link>

        <button
          className={buttonVariants({ variant: "outline", size: "icon" })}
          onClick={() => deleteProduct(itemId as string)}
        >
          <Icons.delete className="w-4 text-gray-500" />
        </button>
      </div>
    </>
  );
}

export default ActionsMenu;
