import { Brand, SearchResponse } from "@/app/search/type";
import { activeTabState } from "@/recoil/search/search-atom";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRecoilValue } from "recoil";

interface Props {
  allTrademarkCount: SearchResponse<Brand>["response"]["count"];
  validTrademark: SearchResponse<Brand>["response"]["count"];
}

export default function InfoContainer({ allTrademarkCount, validTrademark }: Props) {
  const searchParams = useSearchParams();
  const activeTab = useRecoilValue(activeTabState);

  return (
    <div className="flex flex-col flex-nowrap items-center justify-center p-5 gap-5 xs:gap-3 ">
      <div className="text-center">
        <p className="text-[--color-text-strong] text-[2rem] leading-[2.375rem] -tracking-[0.1rem] font-medium mb-2 sm:text-2xl sm:-tracking-[0.075rem] break-keep sm:mb-1">
          {activeTab === 1 ? (
            <>
              <b className="font-bold">‘{searchParams.get("s")}’</b>를 포함한 상표가{" "}
              {allTrademarkCount.totalCount}개 있어요
            </>
          ) : (
            <>
              <b className="font-bold">‘{searchParams.get("s")}’</b>를 포함한 유효한 상표가{" "}
              {validTrademark.totalCount}개 있어요
            </>
          )}
        </p>
        <p className="text-[--color-text-assistive] text-sm font-medium xs:text-xs">
          * 특허청 KIPRIS 상표 데이터와 실시간 연동하여 검색한 결과입니다
        </p>
      </div>
      <Link
        href="https://brandscapeip.com/%EC%83%81%ED%91%9C%EC%B6%9C%EC%9B%90"
        target="_blank"
        className="px-5 py-3 border rounded-lg bg-[--color-primary-normal] text-[--color-text-inverse] text-base font-semibold tracking-tighter outline-none xs:text-sm"
      >
        검색한 상표 출원 의뢰하기
      </Link>
    </div>
  );
}
