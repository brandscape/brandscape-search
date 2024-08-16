"use client";

import FilterOptions from "@/components/search/filter-options";
import KeywordStorage from "@/components/search/keyword-storage";
import SearchClient from "@/components/search/search-client";
import { searchLoadingState } from "@/recoil/search/search-atom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { RangeDateType } from "./type";
import Loading from "../loading";

export default function IdentityClient() {
  /** @description [날짜 필터] 출원일자 */
  const [, setTdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 등록일자 */
  const [, setRdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 국제등록일자 */
  const [, setMdDates] = useState<RangeDateType>();

  const isSearchLoading = useRecoilValue(searchLoadingState);
  return (
    <main className="flex min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      {!isSearchLoading ? (
        <section className="max-w-[45rem] w-full m-auto flex flex-col gap-0">
          <SearchClient />
          <KeywordStorage />
          <FilterOptions setTdDates={setTdDates} setRdDates={setRdDates} setMdDates={setMdDates} />
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
}
