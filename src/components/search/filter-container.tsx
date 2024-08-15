"use client";

import {
  filterOptionState,
  isFilterOpenState,
  searchLoadingState,
} from "@/recoil/search/search-atom";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import FilterCheckbox from "./filter-checkbox";
import { every, isNull } from "lodash";
import { useRouter } from "next/navigation";
import { AdministrationState } from "@/recoil/search/type";
import DatePicker, { registerLocale } from "react-datepicker";
import { ko } from "date-fns/locale/ko";
import DateSvg from "@/icons/date-svg";
import { RangeDateType } from "@/app/search/type";

registerLocale("ko", ko);

interface Props {
  tdDateState: [RangeDateType | undefined, Dispatch<SetStateAction<RangeDateType | undefined>>];
  rdDateState: [RangeDateType | undefined, Dispatch<SetStateAction<RangeDateType | undefined>>];
  mdDateState: [RangeDateType | undefined, Dispatch<SetStateAction<RangeDateType | undefined>>];
}
export default function FilterContainer({
  tdDateState: [tdDates, setTdDates],
  rdDateState: [rdDates, setRdDates],
  mdDateState: [mdDates, setMdDates],
}: Props) {
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
            el.name === "applicationNumber" && el.value && (searchString += `&an=${el.value}`);
            el.name === "internationalRegisterNumber" &&
              el.value &&
              (searchString += `&mn=${el.value}`);
            el.name === "registerNumber" && el.value && (searchString += `&rn=${el.value}`);
            el.name === "applicantName" && el.value && (searchString += `&ap=${el.value}`);
            el.name === "regPrivilegeName" && el.value && (searchString += `&rg=${el.value}`);

            copyFilterOptions = { ...copyFilterOptions, [el.name]: el.value };
          }
        });

        // 출원일자(TC)
        const [applicationStartDateEl, applicationEndDateEl] = [
          targetEl.elements.namedItem("applicationStartDate") as HTMLInputElement,
          targetEl.elements.namedItem("applicationEndDate") as HTMLInputElement,
        ];
        (applicationStartDateEl.value || applicationEndDateEl.value) &&
          (searchString += `&td=${applicationStartDateEl.value}~${applicationEndDateEl.value}`);
        // 등록일자(RD)
        const [registerStartDateEl, registerEndDateEl] = [
          targetEl.elements.namedItem("registerStartDate") as HTMLInputElement,
          targetEl.elements.namedItem("registerEndDate") as HTMLInputElement,
        ];
        (registerStartDateEl.value || registerEndDateEl.value) &&
          (searchString += `&rd=${registerStartDateEl.value}~${registerEndDateEl.value}`);
        // 국제등록일자(MD)
        const [internationalRegisterStartDateEl, internationalRegisterEndDateEl] = [
          targetEl.elements.namedItem("internationalRegisterStartDate") as HTMLInputElement,
          targetEl.elements.namedItem("internationalRegisterEndDate") as HTMLInputElement,
        ];
        (internationalRegisterStartDateEl.value || internationalRegisterEndDateEl.value) &&
          (searchString += `&md=${internationalRegisterStartDateEl.value}~${internationalRegisterEndDateEl.value}`);

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

      const page = params.get("p") ? +params.get("p")! : 1;
      if (page > 1) {
        params.delete("p");
        router.push(`${window.location.pathname}?${params.toString()}`);
      }

      console.log("1", params.get("p"));
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
        applicationNumber,
        internationalRegisterNumber,
        registerNumber,
        applicationDate,
        registerDate,
        internationalRegisterDate,
        applicantName,
        regPrivilegeName,
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
        params.get("an"),
        params.get("mn"),
        params.get("rn"),
        params.get("td"),
        params.get("rd"),
        params.get("md"),
        params.get("ap"),
        params.get("rg"),
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
        ...(applicationNumber && { applicationNumber }),
        ...(internationalRegisterNumber && { internationalRegisterNumber }),
        ...(registerNumber && { registerNumber }),
        ...(applicationDate && {
          applicationStartDate: applicationDate.split("~")[0] || undefined,
          applicationEndDate: applicationDate.split("~")[1] || undefined,
        }),
        ...(registerDate && {
          registerStartDate: registerDate.split("~")[0] || undefined,
          registerEndDate: registerDate.split("~")[1] || undefined,
        }),
        ...(internationalRegisterDate && {
          internationalRegisterStartDate: internationalRegisterDate.split("~")[0] || undefined,
          internationalRegisterEndDate: internationalRegisterDate.split("~")[1] || undefined,
        }),
        ...(applicantName && { applicantName }),
        ...(regPrivilegeName && { regPrivilegeName }),
      }));

      setTdDates((prev) => ({
        ...prev,
        ...(applicationDate &&
          applicationDate.split("~")[0] && { startDate: new Date(applicationDate.split("~")[0]) }),
        ...(applicationDate &&
          applicationDate.split("~")[1] && { endDate: new Date(applicationDate.split("~")[1]) }),
      }));
      setRdDates((prev) => ({
        ...prev,
        ...(registerDate &&
          registerDate.split("~")[0] && { startDate: new Date(registerDate.split("~")[0]) }),
        ...(registerDate &&
          registerDate.split("~")[1] && { endDate: new Date(registerDate.split("~")[1]) }),
      }));
      setMdDates((prev) => ({
        ...prev,
        ...(internationalRegisterDate &&
          internationalRegisterDate.split("~")[0] && {
            startDate: new Date(internationalRegisterDate.split("~")[0]),
          }),
        ...(internationalRegisterDate &&
          internationalRegisterDate.split("~")[1] && {
            endDate: new Date(internationalRegisterDate.split("~")[1]),
          }),
      }));
    },
    [setFilterOptions, setTdDates, setRdDates, setMdDates, router]
  );

  return (
    <section
      role="dialog"
      className={`${
        isFilterOpen ? "visible z-[1] opacity-100" : "invisible -z-[1] opacity-0"
      } absolute top-[3.5rem] left-0 min-h-screen bg-current w-full h-full`}
    >
      <div className="py-16 text-[--color-text-strong] flex flex-col flex-nowrap gap-5 max-w-[45.5rem] m-auto xs:px-4">
        <div className="title pb-[0.625rem]">
          <h1 className="text-2xl font-bold tracking-tighter">상세 검색</h1>
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
          {/** @section 분류정보 */}
          <div key="category" className="flex flex-col flex-nowrap gap-4 pb-2.5">
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
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
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
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
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
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
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
          {/** @section 번호정보 */}
          <div key="number-infomation" className="flex flex-col flex-nowrap gap-4 pb-2.5">
            <h1 className="text-lg font-semibold tracking-tighter">번호정보</h1>
            <div className="flex flex-row flex-nowrap gap-4 xs:grid xs:grid-cols-1">
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="applicationNumber">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    출원번호&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (AN)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="applicationNumber"
                    id="applicationNumber"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.applicationNumber}
                    placeholder="ex)40201200123456"
                    pattern="\d+"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="internationalRegisterNumber">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    국제 등록번호&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (MN)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="internationalRegisterNumber"
                    id="internationalRegisterNumber"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.internationalRegisterNumber}
                    placeholder="ex)12345607"
                    pattern="\d+"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="registerNumber">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    등록번호&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (RN)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="registerNumber"
                    id="registerNumber"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm peer invalid:border-2 invalid:border-[#EF7070]"
                    defaultValue={filterOptions.registerNumber}
                    placeholder="ex)4012345670000"
                    pattern="\d+"
                    onKeyDown={onBlockEnterKey}
                  />
                  <p className="invisible hidden mt-2 font-medium text-xs text-ellipsis text-[#EF7070] peer-invalid:visible peer-invalid:block">
                    유효하지 않은 번호 입니다. 입력한 번호를 확인해 주세요.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/** @section 일자정보 */}
          <div key="date-infomation" className="flex flex-col flex-nowrap gap-4 pb-2.5">
            <h1 className="text-lg font-semibold tracking-tighter">일자정보</h1>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col flex-nowrap gap-2">
                <div>
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    출원일자&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (TC)
                  </span>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap gap-1 items-center">
                <div className="w-full relative">
                  <DatePicker
                    id="applicationStartDate"
                    name="applicationStartDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-end"
                    selected={tdDates?.startDate}
                    onChange={(date) =>
                      date &&
                      setTdDates((prev) => {
                        if (prev && prev.endDate) {
                          return date > prev.endDate
                            ? {
                                startDate: date,
                                endDate: new Date(new Date().setDate(date.getDate() + 1)),
                              }
                            : { ...prev, startDate: date };
                        }
                        return { ...prev, startDate: date };
                      })
                    }
                    selectsStart
                    startDate={tdDates?.startDate}
                    endDate={tdDates?.endDate}
                  />
                  {tdDates?.startDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setTdDates((prev) => ({ ...prev, startDate: undefined }))}
                    />
                  )}
                </div>
                <span>~</span>
                <div className="w-full relative">
                  <DatePicker
                    id="applicationEndDate"
                    name="applicationEndDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-start"
                    selected={tdDates?.endDate}
                    onChange={(date) => date && setTdDates((prev) => ({ ...prev, endDate: date }))}
                    selectsEnd
                    startDate={tdDates?.startDate}
                    endDate={tdDates?.endDate}
                    minDate={tdDates?.startDate}
                  />
                  {tdDates?.endDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setTdDates((prev) => ({ ...prev, endDate: undefined }))}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col flex-nowrap gap-2">
                <div>
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    등록일자&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (RD)
                  </span>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap gap-1 items-center">
                <div className="w-full relative">
                  <DatePicker
                    id="registerStartDate"
                    name="registerStartDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-end"
                    selected={rdDates?.startDate}
                    onChange={(date) =>
                      date &&
                      setRdDates((prev) => {
                        if (prev && prev.endDate) {
                          return date > prev.endDate
                            ? {
                                startDate: date,
                                endDate: new Date(new Date().setDate(date.getDate() + 1)),
                              }
                            : { ...prev, startDate: date };
                        }
                        return { ...prev, startDate: date };
                      })
                    }
                    selectsStart
                    startDate={rdDates?.startDate}
                    endDate={rdDates?.endDate}
                  />
                  {rdDates?.startDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setRdDates((prev) => ({ ...prev, startDate: undefined }))}
                    />
                  )}
                </div>
                <span>~</span>
                <div className="w-full relative">
                  <DatePicker
                    id="registerEndDate"
                    name="registerEndDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-start"
                    selected={rdDates?.endDate}
                    onChange={(date) => date && setRdDates((prev) => ({ ...prev, endDate: date }))}
                    selectsEnd
                    startDate={rdDates?.startDate}
                    endDate={rdDates?.endDate}
                    minDate={rdDates?.startDate}
                  />
                  {rdDates?.endDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setRdDates((prev) => ({ ...prev, endDate: undefined }))}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex flex-col flex-nowrap gap-2">
                <div>
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    국제등록일자&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (MD)
                  </span>
                </div>
              </div>
              <div className="flex flex-row flex-nowrap gap-1 items-center">
                <div className="w-full relative">
                  <DatePicker
                    id="internationalRegisterStartDate"
                    name="internationalRegisterStartDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-end"
                    selected={mdDates?.startDate}
                    onChange={(date) =>
                      date &&
                      setMdDates((prev) => {
                        if (prev && prev.endDate) {
                          return date > prev.endDate
                            ? {
                                startDate: date,
                                endDate: new Date(new Date().setDate(date.getDate() + 1)),
                              }
                            : { ...prev, startDate: date };
                        }
                        return { ...prev, startDate: date };
                      })
                    }
                    selectsStart
                    startDate={mdDates?.startDate}
                    endDate={mdDates?.endDate}
                  />
                  {mdDates?.startDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setMdDates((prev) => ({ ...prev, startDate: undefined }))}
                    />
                  )}
                </div>
                <span>~</span>
                <div className="w-full relative">
                  <DatePicker
                    id="internationalRegisterEndDate"
                    name="internationalRegisterEndDate"
                    locale="ko"
                    dateFormat={"yyyy-MM-dd"}
                    className="outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    disabledKeyboardNavigation
                    showIcon
                    icon={<DateSvg />}
                    popperPlacement="top-start"
                    selected={mdDates?.endDate}
                    onChange={(date) => date && setMdDates((prev) => ({ ...prev, endDate: date }))}
                    selectsEnd
                    startDate={mdDates?.startDate}
                    endDate={mdDates?.endDate}
                    minDate={mdDates?.startDate}
                  />
                  {mdDates?.endDate && (
                    <button
                      type="button"
                      className="clear-button"
                      onClick={() => setMdDates((prev) => ({ ...prev, endDate: undefined }))}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          {/** @section 권리자 정보 */}
          <div key="authorizer-infomation" className="flex flex-col flex-nowrap gap-4 pb-2.5">
            <h1 className="text-lg font-semibold tracking-tighter">권리자 정보</h1>
            <div className="flex flex-row flex-nowrap gap-4 xs:grid xs:grid-cols-1">
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="applicantName">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    출원인&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (AP)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="applicantName"
                    id="applicantName"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    defaultValue={filterOptions.applicantName}
                    placeholder="ex)특허정보원"
                    onKeyDown={onBlockEnterKey}
                  />
                </div>
              </div>
              <div className="flex flex-col flex-nowrap flex-1 gap-2">
                <label htmlFor="regPrivilegeName">
                  <span className="text-sm font-medium tracking-tighter text-ellipsis text-[--color-text-normal]">
                    등록권자&nbsp;
                  </span>
                  <span className="text-sm font-normal tracking-tighter text-ellipsis text-[--color-text-assistive]">
                    (RG)
                  </span>
                </label>
                <div>
                  <input
                    type="search"
                    name="regPrivilegeName"
                    id="regPrivilegeName"
                    className="show-clear outline-none border border-[#E1E5EB] rounded px-3 py-2 w-full text-sm"
                    defaultValue={filterOptions.regPrivilegeName}
                    placeholder="ex)툭허청장"
                    onKeyDown={onBlockEnterKey}
                  />
                </div>
              </div>
            </div>
          </div>
          {/** @section  */}
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
