import { usePathname, useSearchParams } from "next/navigation";
import { TableProps } from "./table-container";
import { parse, format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

/**
 * @description 모든 상표 테이블 컴포넌트
 * @returns
 */
export default function TrademarkTable({ body, count }: TableProps) {
  const router = useRouter();
  const pathname = usePathname();
  const pageParam = useSearchParams().get("p");

  const currentPage = pageParam ? +pageParam : 1;
  const totalPages = Math.ceil(+count.totalCount / +count.numOfRows); // 총 페이지 수

  // 페이지 번호 배열 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  // 한 묶음에 보여줄 페이지 수
  const pagesPerGroup = 10;
  // 현재 페이지가 속한 그룹을 계산
  const currentGroup = Math.floor((currentPage - 1) / pagesPerGroup);
  // 해당 그룹의 페이지 번호들을 추출
  const visiblePages = pageNumbers.slice(
    currentGroup * pagesPerGroup,
    (currentGroup + 1) * pagesPerGroup
  );

  /**
   * 페이지 이동 클릭 이벤트 핸들러
   * @param {number} number 이동할 페이지 번호
   */
  const onClickPage = useCallback(
    (number: number) => () => {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("p");
      number > 0 &&
        number <= pageNumbers.length &&
        router.push(`${pathname}?${searchParams.toString()}&p=${number}`);
    },
    []
  );

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="block">
          <div className="overflow-x-auto w-full scroll-custom">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F7F9] border-b border-b-[#E1E5EB]">
                  {[
                    "출원정보",
                    "출원인",
                    "출원일/등록일",
                    "상태",
                    "견본",
                    "상호명",
                    "분류",
                    "신청인",
                    "출원일",
                    "등록일",
                    "출원번호",
                    "등록번호",
                  ].map((text, index) =>
                    ["출원정보", "출원인", "출원일/등록일"].includes(text) ? (
                      // Mobile display
                      <th
                        key={`all-th-${index}`}
                        scope="col"
                        className={`px-3.5 py-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize hidden xs:table-cell`}
                      >
                        {text}
                      </th>
                    ) : (
                      // PC display
                      <th
                        key={`all-th-${index}`}
                        scope="col"
                        className={`px-3.5 py-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize table-cell xs:hidden`}
                      >
                        {text}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F7F9]">
                {body.items.item.map((item, index) => {
                  return (
                    <tr
                      key={`all-td-${index}`}
                      className="bg-white transition-all duration-300 hover:bg-[#F6F7F9] h-12 text-[--color-text-normal] cursor-pointer"
                      onClick={() => console.log("row click!!", index)}
                    >
                      {/** Mobile display */}
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs font-semibold tracking-tighter text-center hidden xs:table-cell">
                        <div className="flex flex-row flex-nowrap items-center justify-center gap-2">
                          <div className="max-w-[5.5rem] border border-[#E1E5EB] rounded">
                            <picture>
                              <img
                                src={item.drawing}
                                alt="thumbnail-image"
                                className="w-full h-full object-cover"
                              />
                            </picture>
                          </div>
                          <div className="flex flex-col flex-nowrap gap-1">
                            <div
                              className={`${
                                ["소멸", "취하", "포기", "무효", "거절"].includes(
                                  item.applicationStatus
                                )
                                  ? "disable-badge"
                                  : "enable-badge"
                              } badge`}
                            >
                              {item.applicationStatus}
                            </div>
                            <span className="text-[--color-text-assistive] text-xs font-normal">
                              {item.classificationCode && `${item.classificationCode}류`}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] text-xs tracking-tighter text-center hidden xs:table-cell">
                        <div className="overflow-hidden whitespace-nowrap break-keep text-ellipsis max-w-28">
                          {item.applicantName}
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] text-xs tracking-tighter text-center hidden xs:table-cell">
                        <div>
                          {item.applicationDate
                            ? format(
                                parse(item.applicationDate, "yyyyMMdd", new Date()),
                                "yyyy-MM-dd"
                              )
                            : "-"}
                        </div>
                        <div>
                          {item.registrationDate
                            ? format(
                                parse(item.registrationDate, "yyyyMMdd", new Date()),
                                "yyyy-MM-dd"
                              )
                            : "-"}
                        </div>
                      </td>
                      {/** PC display */}
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs font-semibold tracking-tighter text-center xs:hidden">
                        <div
                          className={`${
                            ["소멸", "취하", "포기", "무효", "거절"].includes(
                              item.applicationStatus
                            )
                              ? "disable-badge"
                              : "enable-badge"
                          } badge`}
                        >
                          {item.applicationStatus}
                        </div>
                      </td>
                      <td className="table-cell align-middle text-center xs:hidden">
                        <div className="max-w-10 m-auto border border-[#E1E5EB] rounded">
                          <picture>
                            <img
                              src={item.drawing}
                              alt="thumbnail-image"
                              className="w-full h-full object-cover"
                            />
                          </picture>
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-wrap break-keep text-xs font-semibold tracking-tighter text-center xs:hidden">
                        <div>{item.title}</div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap break-keep text-xs tracking-tighter text-center xs:hidden">
                        <div>{item.classificationCode && `${item.classificationCode}류`}</div>
                      </td>
                      <td className="px-3 py-[0.3125rem] text-xs tracking-tighter text-center xs:hidden">
                        <div className="overflow-hidden whitespace-nowrap break-keep text-ellipsis max-w-[6.25rem]">
                          {item.applicantName}
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs tracking-tighter text-center xs:hidden">
                        <div>
                          {item.applicationDate
                            ? format(
                                parse(item.applicationDate, "yyyyMMdd", new Date()),
                                "yyyy-MM-dd"
                              )
                            : "-"}
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs tracking-tighter text-center xs:hidden">
                        <div>
                          {item.registrationDate
                            ? format(
                                parse(item.registrationDate, "yyyyMMdd", new Date()),
                                "yyyy-MM-dd"
                              )
                            : "-"}
                        </div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs tracking-tighter text-center xs:hidden">
                        <div>{item.applicationNumber || "-"}</div>
                      </td>
                      <td className="px-3 py-[0.3125rem] whitespace-nowrap text-xs tracking-tighter text-center xs:hidden">
                        <div>{item.registrationNumber || "-"}</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/** Page Navigation */}
          <nav className="flex items-center justify-center py-4 " aria-label="Table navigation">
            <ul className="flex items-center justify-center text-sm h-auto gap-2">
              <li
                className="inline-flex items-center justify-center gap-2 w-[2.125rem] h-[2.125rem] ml-0 text-[--color-text-normal] bg-white font-medium text-sm leading-7 cursor-pointer rounded hover:bg-[#EDF0F4] hover:text-[--color-text-strong]"
                onClick={onClickPage(currentPage - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.75005 8L9.31807 4.25L10.2501 5.22951L7.61401 8L10.2501 10.7705L9.31807 11.75L5.75005 8Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
              <li>
                <ul className="flex items-center justify-center gap-1">
                  {visiblePages.map((num) =>
                    currentPage === num ? (
                      <li
                        key={`page-${num}`}
                        className="inline-flex justify-center items-center w-[2.125rem] h-[2.125rem] bg-[#EDF0F4] text-[--color-text-strong] font-medium text-sm cursor-pointer rounded"
                      >
                        {num}
                      </li>
                    ) : (
                      <li
                        key={`page-${num}`}
                        className="inline-flex justify-center items-center w-[2.125rem] h-[2.125rem] text-[--color-text-normal] bg-white font-medium text-sm cursor-pointer rounded hover:bg-[#EDF0F4] hover:text-[--color-text-strong]"
                        onClick={onClickPage(num)}
                      >
                        {num}
                      </li>
                    )
                  )}
                </ul>
              </li>
              <li
                className="inline-flex items-center justify-center gap-2 w-[2.125rem] h-[2.125rem] ml-0 text-[--color-text-normal] bg-white font-medium text-sm leading-7 cursor-pointer rounded hover:bg-[#EDF0F4] hover:text-[--color-text-strong]"
                onClick={onClickPage(currentPage + 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10.25 8L6.68198 4.25L5.75 5.22951L8.38604 8L5.75 10.7705L6.68198 11.75L10.25 8Z"
                    fill="currentColor"
                  />
                </svg>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
