import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ArtProvider } from "@/components/useArtContext";
import { Analytics } from "@vercel/analytics/react"


const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Art Roam V2",
  description: "Where you can view combined art pieces from Chicago Institute of Art and Harvard Art Museum.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
          <ArtProvider>
            <Analytics />
            <Header />
            {children}
            <Footer />
          </ArtProvider>
      </body>
    </html>
  );
}
