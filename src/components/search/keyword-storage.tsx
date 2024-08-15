"use client";

import { keywordStr } from "@/app/search/type";
import { searchKeywordState, searchLoadingState } from "@/recoil/search/search-atom";
import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function KeywordStorage() {
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchKeywordState);
  const router = useRouter();
  const setSearchLoading = useSetRecoilState(searchLoadingState);

  const onKeywordClick = useCallback(
    (text: string) => () => {
      const params = new URLSearchParams(window.location.search);
      if (params.get("s") !== text) {
        params.delete("s");
        params.delete("p");
        router.push(`/search?s=${text}${params.toString() && "&" + params.toString()}`);
        setSearchLoading(true);
      }
    },
    [router, setSearchLoading]
  );

  const onDeleteKeyword = useCallback(
    (index: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      let copySearchKeyword = searchKeyword;
      if (index !== -1) {
        copySearchKeyword = [
          ...copySearchKeyword.slice(0, index),
          ...copySearchKeyword.slice(index + 1),
        ];
        setSearchKeyword(copySearchKeyword);
        localStorage.setItem(keywordStr, copySearchKeyword.join(","));
      }
    },
    [searchKeyword, setSearchKeyword]
  );

  useEffect(() => {
    setSearchKeyword(
      localStorage.getItem(keywordStr)
        ? (localStorage.getItem(keywordStr) as string).split(",")
        : []
    );
  }, [setSearchKeyword]);

  return searchKeyword.length > 0 ? (
    <div className="flex flex-row flex-wrap gap-1 py-3">
      {searchKeyword.length > 0 &&
        searchKeyword.map((text, index) => {
          return (
            <div
              key={`keyword-${index}`}
              className="text-[--color-text-assistive] p-1 inline-flex items-center justify-center gap-1 text-[15px] font-medium leading-[18px] tracking-tighter cursor-pointer"
              onClick={onKeywordClick(text)}
            >
              <label className="cursor-pointer">{text}</label>
              <button
                onClick={onDeleteKeyword(index)}
                className="text-[#CFD5DC] hover:text-slate-400 transition-color"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <rect width="14" height="14" rx="7" fill="currentColor" />
                  <path
                    d="M7 6.3324L4.1676 3.5L3.5 4.1676L6.3324 7L3.5 9.8324L4.1676 10.5L7 7.6676L9.8324 10.5L10.5 9.8324L7.6676 7L10.5 4.1676L9.8324 3.5L7 6.3324Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          );
        })}
    </div>
  ) : (
    <div className="flex flex-row flex-wrap gap-1 py-3">Loading</div>
  );
}
