"use client";

import { ThemeProvider } from "next-themes";

interface PageProps {
  children: React.ReactNode;
}

export function Providers({ children }: PageProps) {
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
