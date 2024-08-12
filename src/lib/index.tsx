"use client";

import "react-toastify/dist/ReactToastify.css";

import { Slide, ToastContainer } from "react-toastify";
import type { ToastOptions } from "react-toastify";
import InfoSvg from "@/icons/info-svg";
import RecoilProvider from "./recoil-provider";

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
      {children}
      <ToastContainer {...defaultToastOption} limit={3} />
    </RecoilProvider>
  );
}
