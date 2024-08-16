import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { Viewport } from "next";
import RootProvider from "@/lib";
import { Suspense } from "react";
import Loading from "./loading";
import Footer from "@/components/Footer";

const myFont = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-std",
});

export const metadata: Metadata = {
  title: "Brandscape",
  description: "Brandscape description",
  viewport:
    "width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${myFont.variable}`}>
      <body>
        <RootProvider>
          <Suspense fallback={<Loading isFullHeight />}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </RootProvider>
      </body>
    </html>
  );
}
