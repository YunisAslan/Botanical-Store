import Link from "next/link";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

function PaginationBar({ currentPage, totalPages }: PaginationProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  const numberedPageItems = [];

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={"?page=" + page}
        key={page}
        className={`border border-input dark:border-secondary rounded text-font dark:text-white font-semibold py-1 px-3 ${
          page === currentPage
            ? "text-white bg-primary border-primary"
            : "hover:brightness-110"
        }`}
      >
        {page}
      </Link>
    );
  }

  const disabledPagination = currentPage === 1;
  const disabledNextPagination = currentPage === totalPages;

  return (
    <>
      <div className="flex space-x-2">
        <Link
          href={`?page=${!disabledPagination ? currentPage - 1 : null}`}
          className={cn(
            "text-xl text-font dark:text-white",
            disabledPagination && "cursor-not-allowed"
          )}
        >
          <Icons.chevronsLeft />
        </Link>
        <div className="space-x-2">{numberedPageItems}</div>
        <Link
          href={`?page=${
            !disabledNextPagination ? currentPage + 1 : currentPage
          }`}
          className={cn(
            "text-xl text-font dark:text-white",
            disabledNextPagination && "cursor-not-allowed"
          )}
        >
          <Icons.chevronsRight />
        </Link>
      </div>
    </>
  );
}

export default PaginationBar;
