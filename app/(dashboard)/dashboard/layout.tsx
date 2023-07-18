import SideNav from "@/components/SideNav";
import { Suspense } from "react";

export const revalidate = 0;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex border-b border-input px-2 sm:px-6">
      <SideNav />

      <div className="py-6 w-full px-2 pb-24 lg:px-10">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}
