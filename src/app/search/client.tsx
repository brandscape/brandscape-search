"use client";

import { Brand, RangeDateType, SearchResponse } from "./type";
import SearchClient from "@/components/search/search-client";
import FilterContainer from "@/components/search/filter-container";
import KeywordStorage from "@/components/search/keyword-storage";
import FilterOptions from "@/components/search/filter-options";
import { useState } from "react";
import InfoContainer from "@/components/search/info-contianer";
import SearchNotFound from "@/components/search/search-not-found";
import { useRecoilValue } from "recoil";
import { searchLoadingState } from "@/recoil/search/search-atom";
import TableContainer from "@/components/search/table-container";
import Loading from "@/components/loading";
import Disclaimer from "@/components/Disclaimer";

type DataSet = Record<"allTrademarkData" | "validTrademarkData", SearchResponse<Brand>>;
interface Props extends DataSet {}
export default function Client({ allTrademarkData, validTrademarkData }: Props) {
  /** @description [날짜 필터] 출원일자 */
  const [tdDates, setTdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 등록일자 */
  const [rdDates, setRdDates] = useState<RangeDateType>();
  /** @description [날짜 필터] 국제등록일자 */
  const [mdDates, setMdDates] = useState<RangeDateType>();

  const isSearchLoading = useRecoilValue(searchLoadingState);

  console.log("test", allTrademarkData.response.body);

  return (
    <>
      <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
        <section className="max-w-[45rem] m-auto flex flex-col gap-0">
          <SearchClient allTrademarkData={allTrademarkData} />
          <KeywordStorage />
          {!isSearchLoading && (
            <FilterOptions
              setTdDates={setTdDates}
              setRdDates={setRdDates}
              setMdDates={setMdDates}
            />
          )}
        </section>
        {isSearchLoading ? (
          <Loading
            label={
              <>
                <p>*특허청 정보와 매칭중입니다.</p>
                <p>잠시만 기다려 주세요.</p>
              </>
            }
          />
        ) : (
          <>
            <section className="w-full p-5 border-t border-b border-[#EDF0F4] xs:p-0">
              {+allTrademarkData.response.count.totalCount ? (
                <>
                  <InfoContainer
                    allTrademarkCount={allTrademarkData.response.count}
                    validTrademark={validTrademarkData.response.count}
                  />
                  <TableContainer
                    allDataBody={allTrademarkData.response.body}
                    allDataCount={allTrademarkData.response.count}
                    validDataBody={validTrademarkData.response.body}
                    validDataCount={validTrademarkData.response.count}
                  />
                </>
              ) : (
                <SearchNotFound />
              )}
            </section>
            <section className="max-w-[45rem] m-auto py-5">
              <Disclaimer />
            </section>
          </>
        )}
      </main>
      <FilterContainer
        tdDateState={[tdDates, setTdDates]}
        rdDateState={[rdDates, setRdDates]}
        mdDateState={[mdDates, setMdDates]}
      />
    </>
  );
}
