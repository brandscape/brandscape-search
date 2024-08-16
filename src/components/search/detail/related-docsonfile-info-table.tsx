import { InfoResponse, RelatedDocsonfileInfo } from "@/app/search/[slug]/type";
import { parse, format } from "date-fns";

interface Props {
  body: InfoResponse<RelatedDocsonfileInfo>["response"]["body"];
}

export default function RelatedDocsonfileInfoTable({ body }: Props) {
  console.log("table body", body.items.relateddocsonfileInfo);
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="block">
          <div className="overflow-x-auto w-full scroll-custom">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F7F9] border-b border-b-[#E1E5EB] h-10 xs:h-8">
                  {[
                    "번호",
                    "서류명",
                    "서류명(접수/발송일자)",
                    "접수/발송일자",
                    "처리상태",
                    "접수/발송번호",
                  ].map((text, index) =>
                    text === "서류명(접수/발송일자)" ? (
                      <th
                        key={`related-docsonfile-info-th-${index}`}
                        scope="col"
                        className={`p-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize hidden xs:table-cell xs:p-1.5`}
                      >
                        {text}
                      </th>
                    ) : ["서류명", "접수/발송일자"].includes(text) ? (
                      <th
                        key={`related-docsonfile-info-th-${index}`}
                        scope="col"
                        className={`p-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize table-cell xs:hidden`}
                      >
                        {text}
                      </th>
                    ) : (
                      <th
                        key={`related-docsonfile-info-th-${index}`}
                        scope="col"
                        className={`p-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize table-cell xs:p-1.5`}
                      >
                        {text}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F7F9] border-b border-b-[#F6F7F9]">
                {body.items.relateddocsonfileInfo.map((item, index) => (
                  <tr
                    key={`related-docsonfile-info-td-${index}`}
                    className="table-row bg-white transition-all duration-300 hover:bg-[#F6F7F9] h-10 text-[--color-text-normal] xs:h-8"
                  >
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center xs:p-0">
                      {index + 1}
                    </td>
                    {/* Mobile display */}
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center hidden xs:table-cell xs:p-1">
                      <div className="flex flex-col flex-nowrap items-start">
                        <span className="text-start mb-1">{item.documentTitle}</span>
                        <span className="text-[--color-text-assistive]">
                          {item.documentDate
                            ? format(parse(item.documentDate, "yyyyMMdd", new Date()), "yyyy-MM-dd")
                            : "-"}
                        </span>
                      </div>
                    </td>
                    {/* PC display */}
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center xs:hidden">
                      <div className="whitespace-nowrap break-keep">{item.documentTitle}</div>
                    </td>
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center xs:hidden">
                      {item.documentDate
                        ? format(parse(item.documentDate, "yyyyMMdd", new Date()), "yyyy-MM-dd")
                        : "-"}
                    </td>
                    {/* All display */}
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center xs:p-1">
                      {item.status}
                    </td>
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center xs:p-1">
                      {item.documentNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
