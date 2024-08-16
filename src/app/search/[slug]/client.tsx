"use client";

import { detailSearchDataState } from "@/recoil/search/search-atom";
import { useRecoilValue } from "recoil";

interface Props {
  relatedDocsonfileInfo: any; // 통합이력정보(상표)
  tradeMarkClassificationInfo: any; // 상표분류코드이력
}
export default function Client({ relatedDocsonfileInfo, tradeMarkClassificationInfo }: Props) {
  const detailSearchData = useRecoilValue(detailSearchDataState);
  return (
    <main className="min-h-screen py-24 m-auto max-w-[60rem] xs:px-4 relative">
      <section className="max-w-[57.5rem] m-auto flex flex-col gap-0">
        <div className="text-black">{JSON.stringify(detailSearchData)}</div>
      </section>
      <section className="max-w-[57.5rem] m-auto flex flex-col gap-0">
        <div className="text-black">{JSON.stringify(relatedDocsonfileInfo)}</div>
      </section>
      <section className="max-w-[57.5rem] m-auto flex flex-col gap-0">
        <div className="text-black">{JSON.stringify(tradeMarkClassificationInfo)}</div>
      </section>
    </main>
  );
}
