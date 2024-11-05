import SearchNotFoundSvg from "@/icons/search-not-found-svg";
import Link from "next/link";
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
      <Link
        href="https://ip.brandscape.co.kr/%EC%83%81%ED%91%9C%EB%93%B1%EB%A1%9D"
        target="_blank"
        className="px-5 py-3 border rounded-lg bg-[--color-primary-normal] text-[--color-text-inverse] text-base font-semibold tracking-tighter outline-none xs:text-sm"
      >
        검색한 상표 출원하기
      </Link>
    </div>
  );
}
