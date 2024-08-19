import { headers } from "next/headers";
import xml2js from "xml2js";
import { notFound } from "next/navigation";
import Client from "./client";
import IdentityClient from "./identity-client";
import { isApplicationNumber } from "@/utils";

/**
 * 모든상표 테이블 데이터 API 이벤트 핸들러 입니다.
 * @param {URLSearchParams} params
 */
const getAllTrademarkData = async (params: URLSearchParams) => {
  try {
    const search = params.get("s");
    const [
      pageNo,
      application,
      registration,
      refused,
      expiration,
      withdrawal,
      publication,
      cancel,
      abandonment,
      classification,
      similarityCode,
      asignProduct,
      applicationNumber,
      internationalRegisterNumber,
      registerNumber,
      applicationDate,
      registerDate,
      internationalRegisterDate,
      applicantName,
      regPrivilegeName,
    ] = [
      params.get("p"),
      params.get("app"),
      params.get("reg"),
      params.get("ref"),
      params.get("exp"),
      params.get("wit"),
      params.get("pub"),
      params.get("can"),
      params.get("aba"),
      params.get("tc"),
      params.get("sc"),
      params.get("gd"),
      params.get("an"),
      params.get("mn"),
      params.get("rn"),
      params.get("td"),
      params.get("rd"),
      params.get("md"),
      params.get("ap"),
      params.get("rg"),
    ];

    const queryParams = {
      ...(search && !isApplicationNumber(search) && { trademarkName: search }),
      ...(applicationNumber
        ? { applicationNumber }
        : search && isApplicationNumber(search) && { applicationNumber: search }),

      ...(pageNo && { pageNo }),
      ServiceKey: process.env.KIPRIS_ACCESS_KEY || "",

      ...(classification && { classification: classification.replace(/ /g, "|") }),
      ...(similarityCode && { similarityCode: similarityCode.replace(/ /g, "|") }),
      ...(asignProduct && { asignProduct: asignProduct.replace(/ /g, "|") }),

      ...(internationalRegisterNumber && { internationalRegisterNumber }),
      ...(registerNumber && { registerNumber }),
      ...(applicationDate && { applicationDate: applicationDate.replace(/-/g, "") }),
      ...(registerDate && { registerDate: registerDate.replace(/-/g, "") }),
      ...(internationalRegisterDate && {
        internationalRegisterDate: internationalRegisterDate.replace(/-/g, ""),
      }),
      ...(applicantName && { applicantName }),
      ...(regPrivilegeName && { regPrivilegeName }),

      /** required params */
      application: application || "true", // 출원
      registration: registration || "true", // 등록
      refused: refused || "true", // 거절
      expiration: expiration || "true", // 소멸
      withdrawal: withdrawal || "true", // 취하
      publication: publication || "true", // 공고
      cancel: cancel || "true", // 무효
      abandonment: abandonment || "true", // 포기

      character: "true", // 문자상표
      figure: "true", // 도형상표
      compositionCharacter: "true", // 복합문자
      figureComposition: "true", // 도형복합
      fragrance: "true", // 냄새상표
      sound: "true", // 소리상표
      color: "true", // 색채상표
      colorMixed: "true", // 색채복합
      dimension: "true", // 입체상표
      hologram: "true", // 홀로그램
      motion: "true", // 동작상표
      visual: "true", // 기타시각적으로인식가능
      invisible: "true", // 기타시각적으로인식불가능

      /**
       * optional params
       * @description (옵션이기는 하지만 true를 안해주면 모든 상표가 검색 되는것으로 추정)
       */
      trademark: "true", // 상표
      serviceMark: "true", // 서비스표
      businessEmblem: "true", // 업무표장
      collectiveMark: "true", // 단체표장
      geoOrgMark: "true", // 지리적표시단체표장
      trademarkServiceMark: "true", // 상표/서비스표
      certMark: "true", // 증명표장
      geoCertMark: "true", // 지리적증명표장
      internationalMark: "true", // 국제등록상표
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `https://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch?${queryString}`;
    // console.log("👉", decodeURIComponent(queryString).split("&"));

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch API data");

    return response.text();
  } catch (error) {
    return "[getAllTrademarkData] Fetch Error";
  }
};

/**
 * 유효한 테이블 데이터 API 이벤트 핸들러 입니다.
 * @param {URLSearchParams} params
 */
const getValidTrademarkData = async (params: URLSearchParams) => {
  try {
    const search = params.get("s");

    const [
      pageNo,
      classification,
      similarityCode,
      asignProduct,
      applicationDate,
      registerDate,
      internationalRegisterDate,
      applicantName,
      regPrivilegeName,
    ] = [
      params.get("p"),
      params.get("tc"),
      params.get("sc"),
      params.get("gd"),
      params.get("td"),
      params.get("rd"),
      params.get("md"),
      params.get("ap"),
      params.get("rg"),
    ];
    const queryParams = {
      ...(search
        ? isApplicationNumber(search)
          ? { applicationNumber: search }
          : { trademarkName: search }
        : {}),
      ...(pageNo && { pageNo }),
      ServiceKey: process.env.KIPRIS_ACCESS_KEY || "",

      ...(classification && { classification: classification.replace(/ /g, "|") }),
      ...(similarityCode && { similarityCode: similarityCode.replace(/ /g, "|") }),
      ...(asignProduct && { asignProduct: asignProduct.replace(/ /g, "|") }),

      ...(applicationDate && { applicationDate: applicationDate.replace(/-/g, "") }),
      ...(registerDate && { registerDate: registerDate.replace(/-/g, "") }),
      ...(internationalRegisterDate && {
        internationalRegisterDate: internationalRegisterDate.replace(/-/g, ""),
      }),
      ...(applicantName && { applicantName }),
      ...(regPrivilegeName && { regPrivilegeName }),

      application: "true", // 출원
      registration: "true", // 등록
      refused: "false", // 거절
      expiration: "false", // 소멸
      withdrawal: "false", // 취하
      publication: "true", // 공고
      cancel: "false", // 무효
      abandonment: "false", // 포기

      character: "true", // 문자상표
      figure: "true", // 도형상표
      compositionCharacter: "true", // 복합문자
      figureComposition: "true", // 도형복합
      fragrance: "true", // 냄새상표
      sound: "true", // 소리상표
      color: "true", // 색채상표
      colorMixed: "true", // 색채복합
      dimension: "true", // 입체상표
      hologram: "true", // 홀로그램
      motion: "true", // 동작상표
      visual: "true", // 기타시각적으로인식가능
      invisible: "true", // 기타시각적으로인식불가능

      trademark: "true", // 상표
      serviceMark: "true", // 서비스표
      businessEmblem: "true", // 업무표장
      collectiveMark: "true", // 단체표장
      geoOrgMark: "true", // 지리적표시단체표장
      trademarkServiceMark: "true", // 상표/서비스표
      certMark: "true", // 증명표장
      geoCertMark: "true", // 지리적증명표장
      internationalMark: "true", // 국제등록상표
    };

    const queryString = new URLSearchParams(queryParams).toString();
    const url = `https://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch?${queryString}`;
    // console.log("👉", decodeURIComponent(queryString).split("&"));

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch API data");

    return response.text();
  } catch (error) {
    return "[getValidTrademarkData] Fetch Error";
  }
};
export default async function Search() {
  const href = headers().get("x-current-href");
  const searchParams = new URL(href || "").searchParams;

  if (!searchParams.size) return <IdentityClient />;

  const allTrademarkXml = await getAllTrademarkData(searchParams);
  const validTrademarkXml = await getValidTrademarkData(searchParams);

  // if (typeof allTrademarkXml === "string" && allTrademarkXml === "search is not defined")
  //   return <IdentityClient />;
  if (!allTrademarkXml) return notFound();

  const parser = new xml2js.Parser({ explicitArray: false });
  const allTrademarkJson = await parser.parseStringPromise(allTrademarkXml);
  const validTrademarkJson = await parser.parseStringPromise(validTrademarkXml);

  return <Client allTrademarkData={allTrademarkJson} validTrademarkData={validTrademarkJson} />;
}
