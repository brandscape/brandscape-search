"use client";

import { Brand, SearchResponse } from "./type";
import SearchClient from "@/components/search/search-client";
import FilterContainer from "@/components/search/filter-container";
import KeywordStorage from "@/components/search/keyword-storage";
import FilterOptions from "@/components/search/filter-options";

interface Props {
  brandData: SearchResponse<Brand>;
}
export default function Client({ brandData }: Props) {
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[45rem] m-auto flex flex-col gap-0">
        <SearchClient brandData={brandData} />
        <KeywordStorage />
        <FilterOptions />
        <pre
          typeof="string"
          className="text-black whitespace-pre-wrap overflow-hidden overflow-x-scroll"
        >
          {JSON.stringify(brandData.response.body.items)}
        </pre>
      </section>
      <FilterContainer />
    </main>
  );
}
