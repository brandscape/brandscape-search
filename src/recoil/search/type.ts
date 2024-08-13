export type AdministrationState =
  | "application" // 출원
  | "registration" // 등록
  | "refused" // 거절
  | "expiration" // 소멸
  | "withdrawal" // 취하
  | "publication" // 공고
  | "cancel" // 무효
  | "abandonment"; // 포기
/**
 * @description Kipris API는 boolean 타입도 {"true" | "false"}와 같은 문자로 처리 필요
 */
export type FilterType = {
  classification?: string; // 상품분류
  similarityCode?: string; // 유사군코드
  asignProduct?: string; // 지정상품

  applicationNumber?: string; // 출원번호
  internationalRegisterNumber?: string; // 국제등록번호
  registerNumber?: string; // 등록번호

  applicationStartDate?: string; // 출원시작일자
  applicationEndDate?: string; // 출원종료일자
  registerStartDate?: string; // 등록시작일자
  registerEndDate?: string; // 등록종료일자
  internationalRegisterStartDate?: string; // 국제등록시작일자
  internationalRegisterEndDate?: string; // 국제등록종료일자

  applicantName?: string; // 출원인
  regPrivilegeName?: string; // 등록권자
} & Record<AdministrationState, boolean>;
