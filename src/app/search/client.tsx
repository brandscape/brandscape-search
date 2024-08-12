"use client";

import dynamic from "next/dynamic";
import { Brand, SearchResponse } from "./type";
import SearchClient from "@/components/search/search-client";
import FilterContainer from "@/components/search/filter-container";
const KeywordStorage = dynamic(() => import("@/components/search/keyword-storage"), { ssr: false });

interface Props {
  brandData: SearchResponse<Brand>;
}
export default function Client({ brandData }: Props) {
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[45rem] m-auto flex flex-col gap-0">
        <SearchClient brandData={brandData} />
        <KeywordStorage />
      </section>
      <FilterContainer />
    </main>
  );
}
