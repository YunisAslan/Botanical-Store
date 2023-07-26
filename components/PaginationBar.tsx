import Link from "next/link";
import { Icons } from "./Icons";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/Button";

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
        href={`?page=${page}`}
        key={page}
        className={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          page === currentPage &&
            "bg-primary dark:bg-white dark:hover:bg-white  dark:text-primary text-white hover:text-primary"
        )}
      >
        {page}
      </Link>
    );
  }

  const disabledPrevBtn = currentPage === 1;
  const disabledNextBtn = currentPage === totalPages;

  return (
    <>
      <div className="flex space-x-2">
        <Link
          aria-label="pagination btn"
          href={disabledPrevBtn ? "#" : `?page=${currentPage - 1}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            disabledPrevBtn && "!text-gray-500 !cursor-not-allowed"
          )}
        >
          <Icons.chevronsLeft />
        </Link>
        {numberedPageItems}
        <Link
          aria-label="pagination btn"
          href={disabledNextBtn ? "#" : `?page=${currentPage + 1}`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            disabledNextBtn && "!text-gray-500 !cursor-not-allowed"
          )}
        >
          <Icons.chevronsRight />
        </Link>
      </div>
    </>
  );
}

export default PaginationBar;
