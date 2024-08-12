import { headers } from "next/headers";
import xml2js from "xml2js";
import { notFound } from "next/navigation";
import Client from "./client";

const getData = async (params: URLSearchParams) => {
  const search = params.get("s");
  const [
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
  ] = [
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
  ];

  if (search) {
    const params = {
      trademarkName: search,
      // pageNo: 1,
      ServiceKey: process.env.KIPRIS_ACCESS_KEY || "",
      application: application || "true", // 출원
      registration: registration || "true", // 등록
      refused: refused || "true", // 거절
      expiration: expiration || "true", // 소멸
      withdrawal: withdrawal || "true", // 취하
      publication: publication || "true", // 공고
      cancel: cancel || "true", // 무효
      abandonment: abandonment || "true", // 포기

      ...(classification && { classification: classification.replace(/ /g, "|") }),
      ...(similarityCode && { similarityCode: similarityCode.replace(/ /g, "|") }),
      ...(asignProduct && { asignProduct: asignProduct.replace(/ /g, "|") }),

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

    const queryString = new URLSearchParams(params).toString();
    const url = `https://plus.kipris.or.kr/kipo-api/kipi/trademarkInfoSearchService/getAdvancedSearch?${queryString}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("failed to fetch API data");

    return response.text();
  } else throw new Error("search is not defined");
};

export default async function Search() {
  const href = headers().get("x-current-href");
  const searchParams = new URL(href || "").searchParams;

  const xml = await getData(searchParams);

  if (!xml) return notFound();

  const parser = new xml2js.Parser({ explicitArray: false });
  const json = await parser.parseStringPromise(xml);

  return <Client brandData={json} />;
}
