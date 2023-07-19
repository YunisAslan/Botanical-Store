import SideNav from "@/components/SideNav";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Botanical Dashboard",
  description: "This is the dashboard layout for products",
};

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
