import { AtomEffect, atom } from "recoil";
import { FilterType, DetailSearchDataType } from "./type";
import { RangeDateType, detailSearchStr } from "@/app/search/type";

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

const store = typeof window !== "undefined" ? window.localStorage : null;

const localStorageEffect: <T>(key: string) => AtomEffect<T> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (store) {
      const savedValue = window.localStorage.getItem(key);
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      }

      onSet((newValue, _, isReset) => {
        console.log("isReset", isReset);

        window.localStorage !== null && isReset
          ? window.localStorage.removeItem(key)
          : window.localStorage.setItem(key, JSON.stringify(newValue));
      });
    }
  };
export const detailSearchDataState = atom<DetailSearchDataType>({
  key: "detailSearchData",
  default: {},
  effects: [localStorageEffect(detailSearchStr)],
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
