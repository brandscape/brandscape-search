"use client";

import { filterOptionState, isFilterOpenState } from "@/recoil/search/search-atom";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import FilterCheckbox from "./filter-checkbox";
import { every } from "lodash";
import type { FilterType } from "@/recoil/search/type";

export default function FilterContainer() {
  const [isFilterOpen, setIsFilterOpen] = useRecoilState(isFilterOpenState);
  const [filterOption, setFilterOption] = useRecoilState(filterOptionState);
  const copyFilterOption = filterOption;

  console.log(
    "?",
    copyFilterOption,
    every([copyFilterOption.application, copyFilterOption.registration])
  );

  const onChangeCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      e.target.form &&
        console.log("all체크박스 확인", every([e.target.form["application"].checked]));
    } else {
      // 하나라도 False상태 일 경우 `전체`체크박스 해제
      e.target.form &&
        e.target.form["all"] instanceof HTMLInputElement &&
        (e.target.form["all"].checked = e.target.checked);
    }
  }, []);

  const onClose = useCallback(() => setIsFilterOpen(false), []);
  return (
    <section
      role="dialog"
      className={`${
        isFilterOpen ? "visible z-[1] opacity-100" : "invisible -z-[1] opacity-0"
      } absolute top-[3.5rem] left-0 min-h-screen bg-current w-full`}
    >
      <div className="py-16 text-[--color-text-strong] flex flex-col flex-nowrap gap-5 max-w-[45.5rem] m-auto xs:px-4">
        <div className="title pb-[0.625rem]">
          <h1 className="text-2xl font-bold tracking-tighter">검색 필터</h1>
        </div>
        <form className="flex flex-col flex-nowrap gap-5">
          <div className="flex flex-row flex-nowrap gap-4">
            <FilterCheckbox
              id="all"
              name="all"
              text="전체"
              checked
              onChange={(e) => {
                if (e.target.form) {
                  e.target.form["application"] instanceof HTMLInputElement &&
                    (e.target.form["application"].checked = e.target.checked);
                }
              }}
            />
            <FilterCheckbox
              id="application"
              name="application"
              text="출원"
              checked
              onChange={onChangeCheckbox}
            />
          </div>
          <div className="button-group flex flex-row flex-nowrap gap-2">
            <button
              className="flex-1 text-[--color-primary-normal] bg-[--color-primary-weak] py-[10px] px-5 text-base font-semibold tracking-tighter rounded-lg hover:text-[--color-primary-strong] hover:bg-[--color-primary-assistive] transition-colors"
              onClick={onClose}
            >
              취소
            </button>
            <button
              className="flex-1 text-[--color-text-inverse] bg-[--color-primary-normal] py-[10px] px-5 text-base font-semibold tracking-tighter rounded-lg hover:text-[#F6F7F9] hover:bg-[--color-primary-strong] transition-colors"
              onClick={() => console.log("click")}
            >
              필터 적용
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
