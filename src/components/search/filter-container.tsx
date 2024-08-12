"use client";

import {
  filterOptionState,
  isFilterOpenState,
  searchLoadingState,
} from "@/recoil/search/search-atom";
import { useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import FilterCheckbox from "./filter-checkbox";
import { every, isNull } from "lodash";
import { useRouter } from "next/navigation";
import { AdministrationState } from "@/recoil/search/type";

export default function FilterContainer() {
  const router = useRouter();

  const [isFilterOpen, setIsFilterOpen] = useRecoilState(isFilterOpenState);
  const [filterOptions, setFilterOptions] = useRecoilState(filterOptionState);
  const setSearchLoading = useSetRecoilState(searchLoadingState);

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

  /**
   * @description 엔터키 submit 핸들러 작동 방어
   */
  const onBlockEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) =>
    e.key === "Enter" && e.preventDefault();

  /**
   * @description submit 이벤트 핸들러
   */
  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const targetEl = e.target;
      const searchParams = new URL(window.location.href).searchParams;

      let searchString = "";
      let copyFilterOptions = filterOptions;
      if (targetEl instanceof HTMLFormElement) {
        Object.keys(filterOptions).forEach((name, _) => {
          const el = targetEl.elements.namedItem(name);

          if (el instanceof HTMLInputElement && el.type === "checkbox") {
            const stateName = el.name as AdministrationState;
            stateName === "application" && !el.checked && (searchString += `&app=${el.checked}`);
            stateName === "publication" && !el.checked && (searchString += `&pub=${el.checked}`);
            stateName === "withdrawal" && !el.checked && (searchString += `&wit=${el.checked}`);
            stateName === "expiration" && !el.checked && (searchString += `&exp=${el.checked}`);
            stateName === "abandonment" && !el.checked && (searchString += `&aba=${el.checked}`);
            stateName === "cancel" && !el.checked && (searchString += `&can=${el.checked}`);
            stateName === "refused" && !el.checked && (searchString += `&ref=${el.checked}`);
            stateName === "registration" && !el.checked && (searchString += `&reg=${el.checked}`);

            copyFilterOptions = { ...copyFilterOptions, [stateName]: el.checked };
          } else if (el instanceof HTMLInputElement && el.type === "search") {
            el.name === "classification" && el.value && (searchString += `&tc=${el.value}`);
            el.name === "similarityCode" && el.value && (searchString += `&sc=${el.value}`);
            el.name === "asignProduct" && el.value && (searchString += `&gd=${el.value}`);
          }
        });

        router.push(`/search?s=${searchParams.get("s")}${searchString}`);
        setSearchLoading(true);
        setFilterOptions((prev) => ({ ...prev, ...copyFilterOptions }));
        setIsFilterOpen(false);
      }
    },
    [filterOptions, setFilterOptions, setIsFilterOpen, setSearchLoading, router]
  );
  const onClose = useCallback(() => setIsFilterOpen(false), [setIsFilterOpen]);

  useEffect(
    // 필터 옵션들을 초기 설정 합니다.
    () => {
      const params = new URL(window.location.href).searchParams;

      const [
        application,
        registration,
        refused,
        expiration,
        withdrawal,
        publication,
        cancel,
        abandonment,
        classification,
        similarityCode,
        asignProduct,
      ] = [
        params.get("app"),
        params.get("reg"),
        params.get("ref"),
        params.get("exp"),
        params.get("wit"),
        params.get("pub"),
        params.get("can"),
        params.get("aba"),
        params.get("tc"),
        params.get("sc"),
        params.get("gd"),
      ];

      const checkboxAll = document.getElementById("all");
      checkboxAll instanceof HTMLInputElement &&
        checkboxAll.type === "checkbox" &&
        (checkboxAll.checked = every([
          isNull(application),
          isNull(publication),
          isNull(withdrawal),
          isNull(expiration),
          isNull(abandonment),
          isNull(cancel),
          isNull(refused),
          isNull(registration),
        ]));

      console.log("initial effect", { classification, similarityCode, asignProduct });
      setFilterOptions((prev) => ({
        ...prev,
        application: application === "false" ? false : true,
        registration: registration === "false" ? false : true,
        refused: refused === "false" ? false : true,
        expiration: expiration === "false" ? false : true,
        withdrawal: withdrawal === "false" ? false : true,
        publication: publication === "false" ? false : true,
        cancel: cancel === "false" ? false : true,
        abandonment: abandonment === "false" ? false : true,
        ...(classification && { classification: classification.replace(/ /g, "+") }),
        ...(similarityCode && { similarityCode: similarityCode.replace(/ /g, "+") }),
        ...(asignProduct && { asignProduct: asignProduct.replace(/ /g, "+") }),
      }));
    },
    [setFilterOptions]
  );

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
        <form id="filter-form" className="flex flex-col flex-nowrap gap-5" onSubmit={onSubmit}>
          <div key="administration-state" className="flex flex-col flex-nowrap gap-4 pb-2.5">
            <h1 className="text-lg font-semibold tracking-tighter">행정 상태</h1>
            <div className="flex flex-row flex-nowrap gap-4 xs:grid xs:grid-cols-4 xs:gap-2">
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
          </div>
          <div key="category" className="flex flex-col flex-nowrap gap-4 pb-2 5">
            <h1 className="text-lg font-semibold tracking-tighter">분류정보</h1>
            <div className="flex flex-row flex-nowrap gap-4 xs:grid xs:grid-cols-1">
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="classification">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    상품분류&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (TC)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="classification"
                    id="classification"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.classification}
                    placeholder="ex) 06+09+11"
                    pattern="\d+(\+\d+)*"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="similarityCode">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    유사군&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (SC)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="similarityCode"
                    id="similarityCode"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.similarityCode}
                    placeholder="ex) G1004+G1103"
                    pattern="G\d+(\+G\d+)*"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="asignProduct">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    지정상품&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (GD)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="asignProduct"
                    id="asignProduct"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.asignProduct}
                    placeholder="ex)스마트폰+통신+식물*재배"
                    pattern="[가-힣+*]+"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="button-group flex flex-row flex-nowrap gap-2">
            <button
              type="button"
              className="flex-1 text-[--color-primary-normal] bg-[--color-primary-weak] py-[10px] px-5 text-base font-semibold tracking-tighter rounded-lg hover:text-[--color-primary-strong] hover:bg-[--color-primary-assistive] transition-colors"
              onClick={onClose}
            >
              취소
            </button>
            <button
              type="submit"
              className="flex-1 text-[--color-text-inverse] bg-[--color-primary-normal] py-[10px] px-5 text-base font-semibold tracking-tighter rounded-lg hover:text-[#F6F7F9] hover:bg-[--color-primary-strong] transition-colors"
            >
              필터 적용
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
