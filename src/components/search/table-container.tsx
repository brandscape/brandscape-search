import { Brand, SearchResponse } from "@/app/search/type";
import { useCallback } from "react";
import TrademarkTable from "./trademark-table";
import { usePathname, useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { activeTabState } from "@/recoil/search/search-atom";

type BodySet = Record<"allDataBody" | "validDataBody", SearchResponse<Brand>["response"]["body"]>;
type CountSet = Record<
  "allDataCount" | "validDataCount",
  SearchResponse<Brand>["response"]["count"]
>;
export interface TableProps extends BodySet, CountSet {}

export default function TableContainer({
  allDataBody,
  allDataCount,
  validDataBody,
  validDataCount,
}: TableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);

  const onClickTab = useCallback(
    (activeIndex: number) => () => {
      setActiveTab(activeIndex);

      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("p");
      router.push(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, router, setActiveTab]
  );
  return (
    <div className="p-5 flex flex-col gap-3 xs:p-0">
      {/** Tabs  */}
      <div className="tabs">
        <div className="flex justify-center">
          <ul className="flex bg-gray-100 rounded-lg transition-all duration-300 p-1 overflow-hidden">
            <li
              className={
                "inline-block py-3 px-6 text-[--color-text-assistive] hover:text-[--color-text-normal] font-semibold text-base whitespace-nowrap cursor-pointer data-[active=true]:text-[--color-text-inverse] data-[active=true]:bg-[--color-primary-normal] data-[active=true]:rounded-lg data-[active=true]:shadow-tab-shadow"
              }
              data-tab={`tabs-1`}
              data-active={activeTab === 1}
              role="tab"
              onClick={onClickTab(1)}
            >
              모든 상표
            </li>
            <li
              className="inline-block py-3 px-6 text-[--color-text-assistive] hover:text-[--color-text-normal] font-semibold text-base whitespace-nowrap cursor-pointer data-[active=true]:text-[--color-text-inverse] data-[active=true]:bg-[--color-primary-normal] data-[active=true]:rounded-lg data-[active=true]:shadow-tab-shadow"
              data-tab={`tabs-2`}
              data-active={activeTab === 2}
              role="tab"
              onClick={onClickTab(2)}
            >
              유효한 상표
            </li>
          </ul>
        </div>
      </div>

      {/** Table */}
      {activeTab === 1 ? (
        <TrademarkTable body={allDataBody} count={allDataCount} />
      ) : (
        <TrademarkTable body={validDataBody} count={validDataCount} />
      )}
    </div>
  );
}
