import { Icons } from "@/components/Icons";
import Table from "@/components/Table";
import { cn } from "@/lib/utils";
import Link from "next/link";

async function DashboardStore() {
  return (
    <>
      <div className="pb-2">
        <h1 className="text-primary text-3xl font-bold pb-1">Products</h1>
        <p className="text-base text-gray-600">Manage your products</p>
      </div>

      <div className="w-full flex justify-end pb-4">
        <Link
          href="/dashboard/store/new"
          className={cn(
            "text-sm flex items-center justify-end gap-2 px-3 border border-input rounded py-1 hover:bg-inputBg transition-colors duration-300"
          )}
        >
          <Icons.new className="w-4" />
          <span>New</span>
        </Link>
      </div>

      {/* Products Table */}
      <Table />
    </>
  );
}

export default DashboardStore;
