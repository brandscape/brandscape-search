"use client";

import Image from "next/image";
import Logo from "../../public/images/brandscape-main-logo.png";
import SearchInput from "@/components/SearchInput";
import { BaseSyntheticEvent, useCallback, useId } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { keywordStr } from "./search/type";
import { useSetRecoilState } from "recoil";
import { filterOptionState, searchKeywordState } from "@/recoil/search/search-atom";

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
          const searchKeywords = keywordValues === null ? [] : keywordValues.split(",");

          const keywords = [searchInput.value, ...searchKeywords];
          localStorage.setItem(keywordStr, keywords.slice(0, 8).toString());
          setSearchKeyword(keywords);

          setFilterOptions((prev) => ({
            ...prev,
            ...(/^\d{13}$/.test(searchInput.value)
              ? { applicationNumber: searchInput.value, trademarkName: undefined }
              : { trademarkName: searchInput.value, applicationNumber: undefined }),
          }));

          router.push(`/search?s=${searchInput.value}`);
        } else {
          toast.isActive(id)
            ? toast.update(id, { render: "상호 또는 상표를 입력하세요" })
            : toast.info("상호 또는 상표를 입력하세요", { toastId: id });
        }
      }
    },
    [id, router, setSearchKeyword, setFilterOptions]
  );

  return (
    <main className="min-h-screen w-full p-24 xs:px-10 lg:px-[6.5rem] main-background flex items-center justify-center">
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
    </main>
  );
}
