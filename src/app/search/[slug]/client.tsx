"use client";

import TradeMarkClassificationInfoTable from "@/components/search/detail/trade-mark-classification-info-table";
import { detailSearchDataState } from "@/recoil/search/search-atom";
import { parse, format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { TradeMarkClassificationInfo, InfoResponse, RelatedDocsonfileInfo } from "./type";
import RelatedDocsonfileInfoTable from "@/components/search/detail/related-docsonfile-info-table";

interface Props {
  slug: string;
  tradeMarkClassificationInfo: InfoResponse<TradeMarkClassificationInfo>; // 상표분류코드이력
  relatedDocsonfileInfo: InfoResponse<RelatedDocsonfileInfo>; // 통합이력정보(상표)
}
export default function Client({
  slug,
  tradeMarkClassificationInfo,
  relatedDocsonfileInfo,
}: Props) {
  const router = useRouter();
  const detailSearchData = useRecoilValue(detailSearchDataState);

  return (
    <main className="relative min-h-screen py-[7.5rem] m-auto max-w-[57.5rem] xs:px-0 xs:py-[3.5rem]">
      <section className="title bg-white mb-5 xs:p-3.5 xs:border-b xs:border-b-[#E1E5EB] xs:mb-0 xs:fixed xs:w-full">
        <div className="relative xs:flex xs:flex-row xs:flex-nowrap xs:items-center xs:text-center">
          <div
            className="absolute hidden cursor-pointer xs:block xs:py1.5"
            onClick={() => router.back()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M13.3332 2.15479L5.48803 9.99996L13.3332 17.8451L14.5117 16.6666L7.84505 9.99996L14.5117 3.3333L13.3332 2.15479Z"
                fill="#474A4E"
              />
            </svg>
          </div>
          <h1
            className="
            text-[--color-text-strong] text-2xl font-bold -tracking-[0.075rem] 
            xs:flex-1 xs:m-auto xs:max-w-[calc(100%-4rem)] xs:text-ellipsis xs:overflow-hidden xs:whitespace-nowrap"
          >
            {detailSearchData.title}
          </h1>
        </div>
      </section>
      <section className="state-info grid grid-cols-[280px_1fr] gap-5 xs:grid-cols-1 xs:gap-0 xs:p-5 xs:mt-[3.8125rem]">
        <div className="thumbnail border border-[#E1E5EB] rounded-lg p-2 xs:p-0 xs:rounded-none">
          {detailSearchData.drawing && (
            <Image
              src={detailSearchData.drawing.replace("http://", "https://")}
              alt="thumbnail"
              className="w-full h-full"
              width={280}
              height={280}
            />
          )}
        </div>
        <div className="info-wrap flex flex-col flex-nowrap">
          {/* {JSON.stringify(detailSearchData)} */}
          <div className="flex-1 grid grid-cols-[1fr_2.5fr] items-center text-sm font-normal tracking-tighter">
            <div className="h-full text-[--color-text-assistive] bg-[#F6F7F9] inline-flex items-center px-2 py-3">
              출원번호/출원일
            </div>
            <div className="h-full text-[--color-text-normal] bg-white inline-flex items-center px-2 py-3 border-b border-[#F6F7F9]">
              {detailSearchData.applicationNumber || "-"}&nbsp;/&nbsp;
              {detailSearchData.applicationDate
                ? format(
                    parse(detailSearchData.applicationDate, "yyyyMMdd", new Date()),
                    "yyyy-MM-dd"
                  )
                : "-"}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-[1fr_2.5fr] items-center text-sm font-normal tracking-tighter">
            <div className="h-full text-[--color-text-assistive] bg-[#F6F7F9] inline-flex items-center px-2 py-3">
              등록번호/등록일
            </div>
            <div className="h-full text-[--color-text-normal] bg-white inline-flex items-center px-2 py-3 border-b border-[#F6F7F9]">
              {detailSearchData.registrationNumber || "-"}&nbsp;/&nbsp;
              {detailSearchData.registrationDate
                ? format(
                    parse(detailSearchData.registrationDate, "yyyyMMdd", new Date()),
                    "yyyy-MM-dd"
                  )
                : "-"}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-[1fr_2.5fr] items-center text-sm font-normal tracking-tighter">
            <div className="h-full text-[--color-text-assistive] bg-[#F6F7F9] inline-flex items-center px-2 py-3">
              출원인
            </div>
            <div className="h-full text-[--color-text-normal] bg-white inline-flex items-center px-2 py-3 border-b border-[#F6F7F9]">
              {detailSearchData.applicantName || "-"}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-[1fr_2.5fr] items-center text-sm font-normal tracking-tighter">
            <div className="h-full text-[--color-text-assistive] bg-[#F6F7F9] inline-flex items-center px-2 py-3">
              등록권자
            </div>
            <div className="h-full text-[--color-text-normal] bg-white inline-flex items-center px-2 py-3 border-b border-[#F6F7F9]">
              {detailSearchData.regPrivilegeName || "-"}
            </div>
          </div>
          <div className="flex-1 grid grid-cols-[1fr_2.5fr] items-center text-sm font-normal tracking-tighter">
            <div className="h-full text-[--color-text-assistive] bg-[#F6F7F9] inline-flex items-center px-2 py-3">
              법적상태
            </div>
            <div className="h-full text-[--color-text-normal] bg-white inline-flex items-center px-2 py-3 border-b border-[#F6F7F9]">
              <div
                className={`${
                  ["소멸", "취하", "포기", "무효", "거절"].includes(
                    detailSearchData.applicationStatus || ""
                  )
                    ? "disable-badge"
                    : "enable-badge"
                } badge`}
              >
                {detailSearchData.applicationStatus}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 상품분류코드이력 테이블 섹션 */}
      <section className="trade-mark-classification-info p-5 flex flex-col gap-4">
        <div className="title text-lg text-[--color-text-strong] font-semibold tracking-tighter">
          <h2>상표설명 / 지정상품</h2>
        </div>
        <TradeMarkClassificationInfoTable body={tradeMarkClassificationInfo.response.body} />
      </section>
      {/* 통합이력정보(상표) 테이블 섹션 */}
      <section className="related-docsonfile-info p-5 flex flex-col gap-4">
        <div className="title text-lg text-[--color-text-strong] font-semibold tracking-tighter">
          <h2>통합 행정정보</h2>
        </div>
        <RelatedDocsonfileInfoTable body={relatedDocsonfileInfo.response.body} />
      </section>
    </main>
  );
}
