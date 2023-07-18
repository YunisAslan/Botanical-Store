import SideNav from "@/components/SideNav";
import { Suspense } from "react";

export const revalidate = 0;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex border-b border-input px-4 sm:px-6">
      <SideNav />

      <div className="py-6 w-full px-2 lg:px-10">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
