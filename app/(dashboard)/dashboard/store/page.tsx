import { Icons } from "@/components/Icons";
import PaginationBar from "@/components/PaginationBar";
import Table from "@/components/Table";
import { db } from "@/firebase/config";
import { cn } from "@/lib/utils";
import { Product } from "@/types";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import Link from "next/link";

interface PageProps {
  searchParams: { page: string };
}

async function DashboardStore({ searchParams: { page = "1" } }: PageProps) {
  const currentPage = parseInt(page);
  const pageSize = 6;

  const productsRef = collection(db, "products");
  const totalItemCountSnapshot = await getDocs(productsRef);
  const totalItemCount = totalItemCountSnapshot.size;

  const totalPages = Math.ceil(totalItemCount / pageSize);

  let productsSnapshot;
  if (currentPage === 1) {
    productsSnapshot = await getDocs(
      query(productsRef, orderBy("created_at"), limit(pageSize))
    );
  } else {
    const prevPageStartAfter = await getStartAfterDoc(currentPage, pageSize);
    productsSnapshot = await getDocs(
      query(
        productsRef,
        orderBy("created_at"),
        startAfter(prevPageStartAfter),
        limit(pageSize)
      )
    );
  }

  const products: Product[] = [];
  productsSnapshot.forEach((doc) => {
    const productData = doc.data() as Product;
    const productId = doc.id; // Get the ID of the document from Firestore
    products.push({ ...productData, id: productId }); // Assign the ID to the product
  });

  // if (!products) return null;

  return (
    <>
      <div className="pb-2">
        <h1 className="text-primary dark:text-white text-3xl font-bold pb-1">
          Products
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400">
          Manage your products
        </p>
      </div>

      <div className="w-full flex justify-end pb-4">
        <Link
          aria-label="new product"
          href="/dashboard/store/new"
          className={cn(
            "text-sm flex items-center text-font dark:text-white justify-end gap-2 px-3 border border-input dark:border-secondary rounded py-1 hover:bg-inputBg dark:hover:bg-slight/70 transition-colors duration-300"
          )}
        >
          <Icons.new className="w-4" />
          <span>New</span>
        </Link>
      </div>

      {/* Products Table */}
      <Table products={products} />

      <div className="flex justify-center my-5">
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      </div>
    </>
  );
}

async function getStartAfterDoc(page: number, pageSize: number) {
  const productsRef = collection(db, "products");
  const querySnapshot = await getDocs(
    query(productsRef, orderBy("created_at"), limit((page - 1) * pageSize))
  );
  return querySnapshot.docs[querySnapshot.docs.length - 1];
}

export default DashboardStore;
