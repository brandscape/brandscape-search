import { TradeMarkClassificationInfo, InfoResponse } from "@/app/search/[slug]/type";

interface Props {
  body: InfoResponse<TradeMarkClassificationInfo>["response"]["body"];
}

export default function TradeMarkClassificationInfoTable({ body }: Props) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto pb-4">
        <div className="block">
          <div className="overflow-x-auto w-full scroll-custom">
            <table className="w-full">
              <thead>
                <tr className="bg-[#F6F7F9] border-b border-b-[#E1E5EB] h-10 xs:h-8">
                  {["번호", "상품분류", "유사군 코드", "지정상품명"].map((text, index) => (
                    <th
                      key={`trade-mark-classification-info-th-${index}`}
                      scope="col"
                      className={`p-3 text-center whitespace-nowrap text-sm leading-4 font-normal text-[--color-text-assistive] capitalize table-cell`}
                    >
                      {text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F7F9] border-b border-b-[#F6F7F9]">
                {body.items.tradeMarkClassificationInfo.map((item, index) => (
                  <tr
                    key={`trade-mark-classification-info-td-${index}`}
                    className="table-row bg-white transition-all duration-300 hover:bg-[#F6F7F9] h-10 text-[--color-text-normal] xs:h-8"
                  >
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center">
                      {item.classOfGoodSerialNumber}
                    </td>
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center">
                      {item.goodsClassificationCode ? `${item.goodsClassificationCode}류` : "-"}
                    </td>
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center">
                      (준비중)
                    </td>
                    <td className="px-1 py-2 text-xs font-normal -tracking-[0.04rem] text-center">
                      <div className="flex justify-center">
                        <span className="block max-w-24 text-ellipsis break-keep whitespace-nowrap overflow-hidden">
                          {item.classofgoodServiceName}
                        </span>
                      </div>
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
