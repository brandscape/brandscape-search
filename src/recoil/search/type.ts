/**
 * @description Kipris API는 boolean 타입도 {"true" | "false"}와 같은 문자로 처리 필요
 */
export type FilterType = {
  application: boolean; // 출원
  registration: boolean; // 등록
  refused: boolean; // 거절
  expiration: boolean; // 소멸
  withdrawal: boolean; // 취하
  publication: boolean; // 공고
  cancel: boolean; // 무효
  abandonment: boolean; // 포기

  classification?: string; // 상품분류
  similarityCode?: string; // 유사군코드
  asignProduct?: string; // 지정상품

  applicationNumber?: string; // 출원번호
  internationalRegisterNumber?: string; // 국제등록번호
  registerNumber?: string; // 등록번호

  applicationDate?: string; // 출원일자
  registerDate?: string; // 등록일자
  internationalRegisterDate?: string; // 국제등록일자

  applicantName?: string; // 출원인
  regPrivilegeName?: string; // 등록권자
};
