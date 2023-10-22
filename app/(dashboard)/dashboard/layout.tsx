import SideNav from "@/components/SideNav";
import { Metadata } from "next";

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
    <div className="flex border-b border-input dark:border-secondary px-2 lg:px-6 dark:bg-secondary">
      <SideNav />

      <div className="py-6 w-full px-2 lg:px-10 pb-24">{children}</div>
    </div>
  );
}
