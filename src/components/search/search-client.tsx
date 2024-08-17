"use client";

import { BaseSyntheticEvent, useCallback, useEffect, useId } from "react";
import SearchInput from "../SearchInput";
import { Brand, SearchResponse, keywordStr } from "@/app/search/type";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filterOptionState,
  isFilterOpenState,
  searchKeywordState,
  searchLoadingState,
} from "@/recoil/search/search-atom";
import { toast } from "react-toastify";
import { AdministrationState } from "@/recoil/search/type";
import Tooltip from "../Tooltip";

interface Props {
  allTrademarkData?: SearchResponse<Brand>;
}

export default function SearchClient({ allTrademarkData }: Props) {
  const id = useId();
  const router = useRouter();

  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionState);
  const setSearchLoading = useSetRecoilState(searchLoadingState);
  const setIsFilterOpen = useSetRecoilState(isFilterOpenState);
  const setSearchKeyword = useSetRecoilState(searchKeywordState);

  /**
   * @description 검색 컨펌 이벤트 핸들러
   */
  const onSearchSubmit = useCallback(
    (e: BaseSyntheticEvent) => {
      e.preventDefault();
      const searchInput = e.target["default-search"];
      const params = new URLSearchParams(window.location.search);

      if (searchInput instanceof HTMLInputElement) {
        if (searchInput.value) {
          /** @description 중복검색 방지 */
          if (searchInput.value !== params.get("s")) {
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

            params.delete("s");
            router.push(
              `/search?s=${searchInput.value}${params.toString() && "&" + params.toString()}`
            );
            setSearchLoading(true);
          }
          searchInput.value = "";
        } else {
          toast.isActive(id)
            ? toast.update(id, { render: "상호 또는 상표를 입력하세요" })
            : toast.info("상포 또는 상표를 입력하세요", { toastId: id });
        }
      }
    },
    [id, router, setSearchKeyword, setSearchLoading, setFilterOptions]
  );

  /**
   * @description 필터 열기 버튼 클릭 이벤트 핸들러
   */
  const onFilterClick = useCallback(() => {
    const formEl = document.getElementById("filter-form");
    if (formEl instanceof HTMLFormElement) {
      Object.keys(filterOptions).forEach((name, _) => {
        const el = formEl.elements.namedItem(name);
        if (el instanceof HTMLInputElement && el.type === "checkbox") {
          const optionName = name as AdministrationState;
          el.checked = Boolean(filterOptions[optionName]);
        }
      });
    }

    setIsFilterOpen(true);
  }, [filterOptions, setIsFilterOpen]);

  useEffect(
    () => setSearchLoading(false),
    [allTrademarkData?.response.header.responseTime, setSearchLoading]
  );

  return (
    <div className="flex flex-row flex-nowrap gap-2">
      <div className="search-container w-full h-[3.125rem]">
        <form className="mx-auto h-full" onSubmit={onSearchSubmit}>
          <SearchInput
            textColor="text-[--color-text-normal]"
            placeholderColor="minor"
            border="border border-solid border-[#E1E5EB]"
          />
        </form>
      </div>
      <div className="filter-container">
        <button
          className="has-tooltip inline-flex justify-center items-center p-3 w-[3.125rem] h-[3.125rem] rounded-lg bg-[#EDF0F4]"
          onClick={onFilterClick}
        >
          <Tooltip isOnlyShow placement="top-left" text="클릭 시 상세 검색이 가능합니다." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M7.5 4.5C7.5 2.84315 6.15685 1.5 4.5 1.5C2.84315 1.5 1.5 2.84315 1.5 4.5C1.5 6.15685 2.84315 7.5 4.5 7.5C6.15685 7.5 7.5 6.15685 7.5 4.5ZM7.5 4.5H16.5M10.5 13.5C10.5 11.8431 11.8431 10.5 13.5 10.5C15.1569 10.5 16.5 11.8431 16.5 13.5C16.5 15.1569 15.1569 16.5 13.5 16.5C11.8431 16.5 10.5 15.1569 10.5 13.5ZM10.5 13.5C6.3995 13.5 1.5 13.5 1.5 13.5"
              stroke="#848990"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
