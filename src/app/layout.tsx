import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { headers } from "next/headers";

const myFont = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-std",
});

export const metadata: Metadata = {
  title: "Brandscape",
  description: "Brandscape description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${myFont.variable}`}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
