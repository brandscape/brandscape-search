import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import { Viewport } from "next";
import RootProvider from "@/lib";
import { Suspense } from "react";
import Footer from "@/components/Footer";
import Loading from "./loading";
import { Analytics } from "@vercel/analytics/react";

const myFont = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard-std",
});

export const metadata: Metadata = {
  title: "상표검색 상표등록 | 브랜드스케이프 Brandscape",
  description: "상표검색 | 상표등록 | 브랜드 지식재산권 전문 브랜드스케이프 ! 대형로펌, 대기업 상표관리 담당 경력 상표전문 10년차 변리사와 함께",

  openGraph: {
    title: "상표검색 상표등록 | 브랜드스케이프 Brandscape",
    description: "상표검색 | 상표등록 | 브랜드 지식재산권 전문 브랜드스케이프 ! 대형로펌, 대기업 상표관리 담당 경력 상표전문 10년차 변리사와 함께",
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
            <Analytics />
          </Suspense>
        </RootProvider>
      </body>
    </html>
  );
}
