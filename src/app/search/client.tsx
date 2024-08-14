"use client";

import { Brand, RangeDateType, SearchResponse } from "./type";
import SearchClient from "@/components/search/search-client";
import FilterContainer from "@/components/search/filter-container";
import KeywordStorage from "@/components/search/keyword-storage";
import FilterOptions from "@/components/search/filter-options";
import { useState } from "react";

interface Props {
  brandData: SearchResponse<Brand>;
}
export default function Client({ brandData }: Props) {
  /** @description [날짜 필터] 출원일자 */
  const [tdDates, setTdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 등록일자 */
  const [rdDates, setRdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 국제등록일자 */
  const [mdDates, setMdDates] = useState<RangeDateType>();

  console.log("data", JSON.stringify(brandData.response.body.items));
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[45rem] m-auto flex flex-col gap-0">
        <SearchClient brandData={brandData} />
        <KeywordStorage />
        <FilterOptions setTdDates={setTdDates} setRdDates={setRdDates} setMdDates={setMdDates} />
      </section>
      <section className="w-full p-5 border-t border-[#EDF0F4]">
        <h1>HELLO WORLD</h1>
      </section>
      <FilterContainer
        tdDateState={[tdDates, setTdDates]}
        rdDateState={[rdDates, setRdDates]}
        mdDateState={[mdDates, setMdDates]}
      />
    </main>
  );
}
