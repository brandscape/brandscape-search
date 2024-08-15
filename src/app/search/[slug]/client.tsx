"use client";

import { detailSearchDataState } from "@/recoil/search/search-atom";
import { useRecoilValue } from "recoil";

export default function Client() {
  const detailSearchData = useRecoilValue(detailSearchDataState);
  return <div className="text-black">{JSON.stringify(detailSearchData)}</div>;
}
