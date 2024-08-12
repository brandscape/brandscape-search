"use client";

import { keywordStr } from "@/app/search/type";
import { searchLoadingState } from "@/recoil/search/search-atom";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useSetRecoilState } from "recoil";

export default function KeywordStorage() {
  if (typeof window === "undefined") return null;
  const searchKeyword = (localStorage.getItem(keywordStr) || "").split(",");
  const router = useRouter();
  const setSearchLoading = useSetRecoilState(searchLoadingState);

  const onKeywordClick = useCallback(
    (text: string) => () => {
      const param = new URLSearchParams(window.location.search).get("s");
      if (param !== text) {
        router.push(`/search?s=${text}`);
        setSearchLoading(true);
      }
    },
    []
  );
  const onDeleteKeyword = useCallback(
    (text: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      console.log("delete", text);
    },
    []
  );
  return (
    <div className="flex flex-row flex-wrap gap-1 py-3">
      {searchKeyword.map((text, index) => {
        return (
          <div
            key={`keyword-${index}`}
            className="text-[--color-text-assistive] p-1 inline-flex items-center justify-center gap-1 text-[15px] font-medium leading-[18px] tracking-tighter cursor-pointer"
            onClick={onKeywordClick(text)}
          >
            <label className="cursor-pointer">{text}</label>
            <button
              onClick={onDeleteKeyword(text)}
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
  );
}
