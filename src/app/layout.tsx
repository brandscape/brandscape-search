import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { Viewport } from "next";
import RootProvider from "@/lib";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Loading from "./loading";

const myFont = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-std",
});

export const metadata: Metadata = {
  title: "브랜드스케이프 | Brandscape",
  description: "브랜드 지식재산권 전문 브랜드스케이프 ! 상표검색 상표 출원",

  openGraph: {
    title: "브랜드스케이프 | Brandscape",
    description: "브랜드 지식재산권 전문 브랜드스케이프 ! 상표검색 상표 출원",
    url: "https://www.brandscape.co.kr/",
    images:
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FvUXra%2FbtsI8qgQsVI%2FpF92wkIo0tolZrSuc92Ko0%2Fimg.png",
  },
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
          <Suspense fallback={<Loading />}>
            <Header />
            {children}
            <Footer />
          </Suspense>
        </RootProvider>
      </body>
    </html>
  );
}
