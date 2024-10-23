"use client";

import { useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";
import LogoDark from "../../public/images/brandscape-main-logo-dark.png";
import { usePathname } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { isFilterOpenState } from "@/recoil/search/search-atom";

export default function Header() {
  const pathname = usePathname();

  const setIsFilterOpen = useSetRecoilState(isFilterOpenState);

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

  const onClearClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      setIsFilterOpen(false);
    },
    [setIsFilterOpen]
  );

  return (
    <header
      className={`fixed w-full h-[3.5rem] z-10 ${
        pathname !== "/" ? "bg-primary-strong" : "bg-transparent"
      }`}
    >
      <nav
        role="navigation"
        className={`nav max-w-[60rem] h-full m-auto flex items-center xs:px-5 xs:justify-custom ${
          pathname !== "/" ? "justify-between" : "justify-end"
        }`}
      >
        <div
          className={`nav-logo z-10 transition-opacity duration-300 px-5 xs:px-0 ${
            pathname !== "/" ? "" : "hidden invisible opacity-0"
          }`}
        >
          <Link href={"/"} className="logo" onClick={onClearClick}>
            <Image src={Logo} alt="logo-image" width={150} />
          </Link>
          <Link href={"/"} className="menu-logo hidden" onClick={onClearClick}>
            <Image src={LogoDark} alt="logo-image" width={150} />
          </Link>
        </div>
        <div className="nav-menu transition-right duration-500 flex flex-row flex-nowrap gap-2 px-5 xs:fixed xs:right-[-100%] z-10 ">
          <Link
            href="/search"
            className="px-3 xs:px-0 xs:py-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            상표검색
          </Link>
          <Link
            href="http://ip.brandscape.co.kr/%EC%83%81%ED%91%9C%EC%B6%9C%EC%9B%90"
            className="px-3 xs:px-0 xs:py-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            상표출원
          </Link>
          <Link
            href="http://ip.brandscape.co.kr/%EB%B9%84%EC%9A%A9%EC%95%88%EB%82%B4"
            className="px-3 xs:px-0 xs:py-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            비용안내
          </Link>
          <Link
            href="https://ip.brandscape.co.kr/%EC%9D%BC%EB%B0%98%EB%AC%B8%EC%9D%98"
            className="px-3 xs:px-0 xs:py-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            일반문의
          </Link>
          <Link
            href="http://ip.brandscape.co.kr/%ED%9A%8C%EC%82%AC%EC%86%8C%EA%B0%9C"
            className="px-3 xs:px-0 xs:py-3 py-[10px] rounded text-[15px] font-medium text-[--color-text-minor] xs:text-[--color-text-normal] leading-[1.125rem] tracking-tighter xs:hover:text-[--color-text-minor] hover:text-[--color-text-inverse] transition-[color] duration-300"
            onClick={onClearClick}
          >
            회사소개
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
