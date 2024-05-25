import "@/styles/global.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "nprogress/nprogress.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shorter Urls",
  description:
    "A comprehensive link shortening website that allows you to easily convert long URLs into shorter, more manageable links. Perfect for sharing on social media, in emails, or anywhere else a compact link is needed.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  );
}
