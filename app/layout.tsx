import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/config/site";
import { Analytics } from "@vercel/analytics/react";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Botanical Store",
  description: "Created by Yunis Aslan",
  manifest: `${siteConfig.url}/manifest.json`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <Providers>
          <main>
            <Header />
            {children}
            <Footer />
            <Analytics />
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
