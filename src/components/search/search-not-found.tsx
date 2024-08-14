import SearchNotFoundSvg from "@/icons/search-not-found-svg";
import { useSearchParams } from "next/navigation";

export default function SearchNotFound() {
  const searchParams = useSearchParams();
  return (
    <div className="min-h-[32.5rem] flex flex-col items-center justify-center gap-5 xs:min-h-[27.5rem] xs:gap-3">
      <SearchNotFoundSvg />
      <div className="text-center">
        <p className="text-[--color-text-strong] text-2xl -tracking-[0.075rem] font-medium mb-2 xs:text-base xs:tracking-tighter xs:mb-1">
          <b className="font-bold">‘{searchParams.get("s")}’</b>에 대한 검색결과가 없습니다.
        </p>
        <p className="text-[--color-text-assistive] text-sm font-medium xs:text-xs">
          검색한 상표를 바로 출원하러 가볼까요?
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
