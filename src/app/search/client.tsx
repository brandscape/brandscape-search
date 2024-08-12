"use client";

import { Brand, SearchResponse } from "./type";
import SearchClient from "@/components/search/search-client";
import FilterContainer from "@/components/search/filter-container";
import KeywordStorage from "@/components/search/keyword-storage";

interface Props {
  brandData: SearchResponse<Brand>;
}
export default function Client({ brandData }: Props) {
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[45rem] m-auto flex flex-col gap-0">
        <SearchClient brandData={brandData} />
        <KeywordStorage />
        <div className="text-black flex flex-row flex-nowrap">
          <div>
            <span className="text-base font-bold tracking-tighter">적용 필터</span>
          </div>
        </div>
      </section>
      <FilterContainer />
    </main>
  );
}
