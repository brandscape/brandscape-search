"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import LogoDark from "../../public/images/brandscape-main-logo-dark.png";

export default function Header() {
  const onToggle = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-menu");

    if (hamburger instanceof HTMLDivElement && menu instanceof HTMLDivElement) {
      if (hamburger.classList.contains("is-opened")) {
        hamburger.classList.remove("is-opened");
        menu.classList.remove("show-menu");
      } else {
        hamburger.classList.add("is-opened");
        menu.classList.add("show-menu");
      }
    }
  }, []);

  const onClearClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".nav-menu");

    if (
      hamburger instanceof HTMLDivElement &&
      menu instanceof HTMLDivElement &&
      hamburger.classList.contains("is-opened")
    ) {
      hamburger.classList.remove("is-opened");
      menu.classList.remove("show-menu");
    }
  }, []);

  return (
    <header className="fixed w-full h-[3.5rem] bg-transparent">
      <nav className="nav max-w-[60rem] h-full m-auto flex items-center justify-end xs:px-5 xs:justify-between">
        <div className="nav-menu transition-right duration-500 flex flex-row flex-nowrap gap-2 px-5 xs:fixed xs:right-[-100%]">
          <Link
            href="/sub"
            className="px-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            상표검색
          </Link>
          <Link
            href="https://naver.com"
            target="_blank"
            className="px-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            상표출원
          </Link>
          <Link
            href="https://google.com"
            target="_blank"
            className="px-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            비용안내
          </Link>
          <Link
            href="https://tailwindcss.com/"
            target="_blank"
            className="px-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            회사소개
          </Link>
          <Link
            href="https://nextjs.org/"
            target="_blank"
            className="px-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            고객센터
          </Link>
        </div>
        <div className="nav-logo z-10 invisible opacity-0 transition-opacity duration-300">
          <Link href={"/"} className="logo">
            <Image src={LogoDark} alt="logo-image" width={150} />
          </Link>
        </div>
        <div
          className="hamburger w-6 h-6 hidden text-2xl cursor-pointer xs:inline-flex xs:flex-col"
          onClick={onToggle}
        >
          <div className="bar block w-full m-auto h-[3px] rounded-md transition-all duration-500 bg-[--color-text-inverse]"></div>
          <div className="bar block w-full m-auto h-[3px] rounded-md transition-all duration-500 bg-[--color-text-inverse]"></div>
          <div className="bar block w-full m-auto h-[3px] rounded-md transition-all duration-500 bg-[--color-text-inverse]"></div>
        </div>
      </nav>
    </header>
  );
}
