import { atom } from "recoil";
import { FilterType } from "./type";
import { RangeDateType } from "@/app/search/type";

export const isFilterOpenState = atom<boolean>({
  key: "isFilterOpen",
  default: false,
});

export const filterOptionState = atom<FilterType>({
  key: "filterOption",
  default: {
    application: true,
    registration: true,
    refused: true,
    expiration: true,
    withdrawal: true,
    publication: true,
    cancel: true,
    abandonment: true,
    classification: undefined,
    similarityCode: undefined,
    asignProduct: undefined,
    applicationNumber: undefined,
    internationalRegisterNumber: undefined,
    registerNumber: undefined,
    applicationStartDate: undefined,
    applicationEndDate: undefined,
    registerStartDate: undefined,
    registerEndDate: undefined,
    internationalRegisterStartDate: undefined,
    internationalRegisterEndDate: undefined,
    applicantName: undefined,
    regPrivilegeName: undefined,
  },
});

export const searchKeywordState = atom<string[]>({
  key: "searchKeyword",
  default: [],
});

/**
 * @description 검색 로딩 Atom
 */
export const searchLoadingState = atom<boolean>({
  key: "searchLoading",
  default: false,
});

export const tdDateState = atom<RangeDateType>({
  key: "tdDate",
});
export const rdDateState = atom<RangeDateType>({
  key: "rdDate",
});
export const mdDateState = atom<RangeDateType>({
  key: "mdDate",
});
