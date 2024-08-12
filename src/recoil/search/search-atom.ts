import { atom } from "recoil";
import { FilterType } from "./type";

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
  /** @deprecated */
  // effects: [
  //   ({ setSelf, onSet }) => {
  //     if (typeof window !== "undefined") {
  //       const keywordValues = localStorage.getItem(keywordStr);
  //       if (keywordValues !== null) {
  //         const arr = keywordValues.split(",");
  //         console.log("test", arr);
  //         setSelf(arr);
  //       }

  //       onSet((newValue, _, isReset) => {
  //         console.log("onSet", newValue, isReset);
  //         if (isReset) localStorage.removeItem(keywordStr);
  //       });
  //     }
  //   },
  //   () => {
  //     // NOTE: clean uo func
  //   },
  // ],
});

export const searchFilterState = atom<any>({
  key: "searchFilter",
  default: {},
});
