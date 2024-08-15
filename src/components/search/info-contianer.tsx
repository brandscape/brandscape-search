import { Brand, SearchResponse } from "@/app/search/type";
import { useSearchParams } from "next/navigation";

interface Props {
  count: SearchResponse<Brand>["response"]["count"];
}

export default function InfoContainer({ count }: Props) {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col flex-nowrap items-center justify-center p-5 gap-5 xs:gap-3 ">
      <div className="text-center">
        <p className="text-[--color-text-strong] text-[2rem] leading-[2.375rem] -tracking-[0.1rem] font-medium mb-2 sm:text-2xl sm:-tracking-[0.075rem] break-keep sm:mb-1">
          <b className="font-bold">‘{searchParams.get("s")}’</b>를 포함한 상표가 {count.totalCount}
          개나 있어요
        </p>
        <p className="text-[--color-text-assistive] text-sm font-medium xs:text-xs">
          * 특허청 KIPRIS 상표 데이터와 실시간 연동하여 검색한 결과입니다
        </p>
      </div>
      <div>
        <button
          type="button"
          className="px-5 py-2.5 border rounded-lg bg-[--color-primary-normal] text-[--color-text-inverse] text-base font-semibold tracking-tighter xs:text-sm"
          onClick={() => alert("준비중입니다.")}
        >
          검색한 상표 출원 의뢰하기
        </button>
      </div>
    </div>
  );
}
