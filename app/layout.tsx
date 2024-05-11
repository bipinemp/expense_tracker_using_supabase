import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Made By Bipin Bhandari",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistMono.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
