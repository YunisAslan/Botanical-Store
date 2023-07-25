import "@/styles/globals.css";
import { Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";

const openSans = Open_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "Botanical Store",
  description: "Created by Yunis Aslan",
  manifest: "./manifest.json",
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
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
