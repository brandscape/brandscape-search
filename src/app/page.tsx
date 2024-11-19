"use client";

import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";
import SearchInput from "@/components/SearchInput";
import { BaseSyntheticEvent, useCallback, useId } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { keywordStr } from "./search/type";
import { useSetRecoilState } from "recoil";
import {
  filterOptionState,
  searchKeywordState,
} from "@/recoil/search/search-atom";
import { isApplicationNumber } from "@/utils";
import Link from "next/link";

export default function Home() {
  const id = useId();
  const router = useRouter();
  const setSearchKeyword = useSetRecoilState(searchKeywordState);
  const setFilterOptions = useSetRecoilState(filterOptionState);

  const onSearchSubmit = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();
      const searchInput = e.target["default-search"];

      if (searchInput instanceof HTMLInputElement) {
        if (searchInput.value) {
          const keywordValues = localStorage.getItem(keywordStr);
          const searchKeywords =
            keywordValues === null ? [] : keywordValues.split(",");

          const keywords = [searchInput.value, ...searchKeywords];
          localStorage.setItem(keywordStr, keywords.slice(0, 8).toString());
          setSearchKeyword(keywords);

          setFilterOptions((prev) => ({
            ...prev,
            ...(isApplicationNumber(searchInput.value)
              ? {
                  applicationNumber: searchInput.value,
                  trademarkName: undefined,
                }
              : {
                  trademarkName: searchInput.value,
                  applicationNumber: undefined,
                }),
          }));

          router.push(`/search?s=${searchInput.value}`);
        } else {
          toast.isActive(id)
            ? toast.update(id, { render: "키워드를 입력하세요" })
            : toast.info("키워드를 입력하세요", { toastId: id });
        }
      }
    },
    [id, router, setSearchKeyword, setFilterOptions]
  );

  return (
    <main className="min-h-screen w-full p-24 xs:px-10 lg:px-[6.5rem] main-background flex items-center justify-center sm:p-[6rem_6rem_15rem_6rem]">
      <div className="container flex flex-col flex-nowrap gap-[1.875rem] justify-center items-center">
        <div className="logo">
          <Image src={Logo} alt="logo" width={428} height={90} priority />
        </div>
        <div className="search-container max-w-[34.375rem] w-full h-[3.125rem]">
          <form className="mx-auto h-full" onSubmit={onSearchSubmit}>
            <SearchInput />
          </form>
        </div>
      </div>
      <Link href="https://ip.brandscape.co.kr/%EC%83%81%ED%91%9C%EB%93%B1%EB%A1%9D">
        <button className="fixed bottom-0 left-0 w-full px-6 py-4 text-lg font-bold text-white bg-[#1a4db6] sm:block hidden">
          상표등록 문의하기
        </button>
      </Link>
    </main>
  );
}
