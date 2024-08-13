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
  /** @description 출원일자 */
  const [tdDates, setTdDates] = useState<RangeDateType>();
  /** @description 등록일자 */
  const [rdDates, setRdDates] = useState<RangeDateType>();
  /** @description 국제등록일자 */
  const [mdDates, setMdDates] = useState<RangeDateType>();
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[45rem] m-auto flex flex-col gap-0">
        <SearchClient brandData={brandData} />
        <KeywordStorage />
        <FilterOptions setTdDates={setTdDates} setRdDates={setRdDates} setMdDates={setMdDates} />
        <pre
          typeof="string"
          className="text-black whitespace-pre-wrap overflow-hidden overflow-x-scroll"
        >
          {JSON.stringify(brandData.response.body.items)}
        </pre>
      </section>
      <FilterContainer
        tdDateState={[tdDates, setTdDates]}
        rdDateState={[rdDates, setRdDates]}
        mdDateState={[mdDates, setMdDates]}
      />
    </main>
  );
}
