export type SearchResponse<T> = {
  response: {
    header: {
      requestMsgID: string;
      responseMsgID: string;
      responseTime: string;
      resultCode: string;
      resultMsg: string;
      successYN: "Y" | "N";
    };
    body: {
      items: {
        item: T[];
      };
    };
    count: {
      numOfRows: string;
      pageNo: string;
      totalCount: string;
    };
  };
};

type Keys =
  | "agentName"
  | "appReferenceNumber"
  | "applicantName"
  | "applicationDate"
  | "applicationNumber"
  | "applicationStatus"
  | "bigDrawing"
  | "classificationCode"
  | "drawing"
  | "fullText"
  | "indexNo"
  | "internationalRegisterDate"
  | "internationalRegisterNumber"
  | "priorityDate"
  | "priorityNumber"
  | "publicationDate"
  | "publicationNumber"
  | "regPrivilegeName"
  | "regReferenceNumber"
  | "registrationDate"
  | "registrationNumber"
  | "registrationPublicDate"
  | "registrationPublicNumber"
  | "title"
  | "viennaCode";

/**
 * @type {agentName} 대리인명
 * @type {appReferenceNumber} 출원참조번호
 * @type {applicantName} 출원인명
 * @type {applicationDate} 출원일자
 * @type {applicationNumber} 출원번호
 * @type {applicationStatus} 출원상태
 * @type {fullText} 전문존재유무
 * @type {classificationCode} 상품분류코드
 * @type {bigDrawing} 큰 이미지경로
 * @type {priorityDate} 우선권주장일자
 * @type {priorityNumber} 우선권주장번호
 * @type {publicationDate} 출원공고일자
 * @type {publicationNumber} 출원공고번호
 * @type {regPrivilegeName} 등록권자명/특허고객번호
 * @type {regReferenceNumber} 등록참조번호
 * @type {registrationDate} 등록일자
 * @type {registrationNumber} 등록번호
 * @type {RegistrationPublicDate} 등록공고일자
 * @type {registrationPublicNumber} 등록공고번호
 * @type {drawing} 이미지경로
 * @type {title} 상표명칭
 * @type {viennaCode} 도형코드
 */
export type Brand = Record<Keys, string>;

export const keywordStr = "search-keyword";

export type RangeDateType = {
  startDate?: Date;
  endDate?: Date;
};
