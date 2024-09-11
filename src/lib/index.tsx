"use client";

import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

import { Slide, ToastContainer } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import InfoSvg from "@/icons/info-svg";
import RecoilProvider from "./recoil-provider";
import Script from "next/script";

export default function RootProvider({ children }: React.PropsWithChildren) {
  const defaultToastOption: ToastOptions = {
    position: "bottom-center",
    hideProgressBar: false,
    autoClose: 2000,
    closeOnClick: true,
    transition: Slide,
    icon: () => <InfoSvg width="1.125rem" height="1.125rem" transform="rotate(180)" />,
    closeButton: ({ closeToast }) => (
      <button className="Toastify__close-button" type="button" onClick={closeToast}>
        확인
      </button>
    ),
  };
  return (
    <RecoilProvider>
      <Script
        src="https://wcs.naver.net/wcslog.js"
        strategy="afterInteractive"
        type="text/javascript"
      />
      <Script id="naver-analytics" strategy="afterInteractive">
        {`
          if(!wcs_add) var wcs_add = {};
          wcs_add["wa"] = "b11a86fd040ce8";
          if(window.wcs) { wcs_do(); }
        `}
      </Script>
      {/* Smartlog */}
      <Script id="smartlog" strategy="afterInteractive">
        {`
          var hpt_info={'_account':'UHPT-28754', '_server': 'a28'};
        `}
      </Script>
      <Script
        src="https://cdn.smlog.co.kr/core/smart.js"
        strategy="afterInteractive"
        type="text/javascript"
      />
      <noscript>
        <img
          src="https://a28.smlog.co.kr/smart_bda.php?_account=28754"
          style={{ display: "none", width: 0, height: 0, border: "none" }}
        />
      </noscript>
      {children}
      <ToastContainer {...defaultToastOption} limit={3} />
    </RecoilProvider>
  );
}
