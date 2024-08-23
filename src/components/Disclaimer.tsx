/**
 * 고지사항 섹션
 */
export default function Disclaimer() {
  return (
    <div className="flex flex-col gap-4 xs:gap-2">
      <div className="title text-lg text-[--color-text-strong] font-semibold tracking-tighter">
        <h1>고지사항</h1>
      </div>
      <div className="bg-gray-50 p-4">
        <ul className="with-dot">
          <li className="pl-3 text-sm font-light tracking-tight break-keep">
            특허청 데이터베이스 업데이트 주기에 따라 최근 출원 상표는 검색되지 않을 수 있으며 (약2
            주), 부분거절에 따른 지정상품 정보 등에 실제 상태와 일부 차이가 발생할 수 있습니다.
          </li>
          <li className="pl-3 text-sm font-light tracking-tight break-keep">
            조약 우선권주장 등을 통하여 우선일이 출원일로 인정되는 선행상표가 추후에 발생할 수 있
            습니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
