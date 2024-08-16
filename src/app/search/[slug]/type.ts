export type TradeMarkClassificationInfoResponse<T> = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      items: {
        tradeMarkClassificationInfo: T[];
      };
    };
  };
};

export type TradeMarkClassificationInfoKeys =
  | "additionDeletionCode"
  | "classOfGoodSerialNumber"
  | "classificationTypeCodeName"
  | "classificationVersion"
  | "classofgoodServiceName"
  | "goodsClassificationCode"
  | "identificationNumber"
  | "serialNumber"
  | "status";

/**
 * @type {additionDeletionCode} 추가삭제코드
 * @type {classOfGoodSerialNumber} 지정상품일련번호
 * @type {classificationTypeCodeName} 분류구분코드명
 * @type {classificationVersion} NICE분류판
 * @type {classofgoodServiceName} 지정상품명
 * @type {goodsClassificationCode} 상품분류코드
 * @type {identificationNumber} 출원번호/등록번호
 * @type {serialNumber} 일련번호
 * @type {status} 상태
 */
export type TradeMarkClassificationInfo = Record<TradeMarkClassificationInfoKeys, string>;