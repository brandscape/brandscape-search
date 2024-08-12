"use client";

import { isFilterOpenState } from "@/recoil/search/search-atom";
import { useCallback } from "react";
import { useRecoilState } from "recoil";
import FilterCheckbox from "./filter-checkbox";
import { every } from "lodash";

export default function FilterContainer() {
  const [isFilterOpen, setIsFilterOpen] = useRecoilState(isFilterOpenState);

  const onChangeCheckbox = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      // 모든 체크박스가 True상태 일 경우 `전체`체크박스 설정
      e.target.form &&
        every([
          e.target.form["application"].checked,
          e.target.form["publication"].checked,
          e.target.form["withdrawal"].checked,
          e.target.form["expiration"].checked,
          e.target.form["abandonment"].checked,
          e.target.form["cancel"].checked,
          e.target.form["refused"].checked,
          e.target.form["registration"].checked,
        ]) &&
        (e.target.form["all"].checked = e.target.checked);
    } else {
      // 하나라도 False상태 일 경우 `전체`체크박스 해제
      e.target.form &&
        e.target.form["all"] instanceof HTMLInputElement &&
        (e.target.form["all"].checked = e.target.checked);
    }
  }, []);

  const onClose = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);
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
                  e.target.form["publication"] instanceof HTMLInputElement &&
                    (e.target.form["publication"].checked = e.target.checked);
                  e.target.form["withdrawal"] instanceof HTMLInputElement &&
                    (e.target.form["withdrawal"].checked = e.target.checked);
                  e.target.form["expiration"] instanceof HTMLInputElement &&
                    (e.target.form["expiration"].checked = e.target.checked);
                  e.target.form["abandonment"] instanceof HTMLInputElement &&
                    (e.target.form["abandonment"].checked = e.target.checked);
                  e.target.form["cancel"] instanceof HTMLInputElement &&
                    (e.target.form["cancel"].checked = e.target.checked);
                  e.target.form["refused"] instanceof HTMLInputElement &&
                    (e.target.form["refused"].checked = e.target.checked);
                  e.target.form["registration"] instanceof HTMLInputElement &&
                    (e.target.form["registration"].checked = e.target.checked);
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
            <FilterCheckbox
              id="publication"
              name="publication"
              text="공고"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="withdrawal"
              name="withdrawal"
              text="취하"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="expiration"
              name="expiration"
              text="소멸"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="abandonment"
              name="abandonment"
              text="포기"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="cancel"
              name="cancel"
              text="무효"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="refused"
              name="refused"
              text="거절"
              checked
              onChange={onChangeCheckbox}
            />
            <FilterCheckbox
              id="registration"
              name="registration"
              text="등록"
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
