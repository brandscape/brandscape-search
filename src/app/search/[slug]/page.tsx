import { headers } from "next/headers";
import Client from "./client";
import xml2js from "xml2js";
import { notFound } from "next/navigation";

const getFetch = async (applicationNumber: string) => {
  try {
    const parser = new xml2js.Parser({ explicitArray: false });
    let params = {};

    // 통합이력정보(상표)
    params = {
      applicationNumber,
      accessKey: process.env.KIPRIS_ACCESS_KEY || "",
    };

    let queryString = new URLSearchParams(params).toString();
    let url = `http://plus.kipris.or.kr/openapi/rest/RelatedDocsonfileTMService/relatedDocsonfileInfo?${queryString}`;

    const relatedDocsonfileInfoResponse = await fetch(url);
    if (!relatedDocsonfileInfoResponse.ok) throw new Error("faild to fetch 상표통합이력 API data");
    const relatedDocsonfileInfoXml = await relatedDocsonfileInfoResponse.text();
    const relatedDocsonfileInfoJson = await parser.parseStringPromise(relatedDocsonfileInfoXml);

    // 상표분류코드이력
    params = {
      identificationNumber: applicationNumber,
      accessKey: process.env.KIPRIS_ACCESS_KEY || "",
    };

    queryString = new URLSearchParams(params).toString();
    url = `http://plus.kipris.or.kr/openapi/rest/TradeMarkClassificationInfoService/tradeMarkClassificationInfo?${queryString}`;

    const tradeMarkClassificationInfoResponse = await fetch(url);
    if (!tradeMarkClassificationInfoResponse.ok)
      throw new Error("faild to fetch 상표분류코드이력 API data");
    const tradeMarkClassificationInfoXml = await tradeMarkClassificationInfoResponse.text();
    const tradeMarkClassificationInfoJson = await parser.parseStringPromise(
      tradeMarkClassificationInfoXml
    );

    return {
      error: false,
      relatedDocsonfileInfo: relatedDocsonfileInfoJson,
      tradeMarkClassificationInfo: tradeMarkClassificationInfoJson,
    };
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      return {
        error: true,
        message: error.message,
      };
    }

    return {
      error: true,
      message: String(error),
    };
  }
};
interface Props {
  params: { slug: string };
}
export default async function Page({ params }: Props) {
  const href = headers().get("x-current-href");
  const data = await getFetch(params.slug);
  console.log("👉", data);

  if (data.error) return notFound();

  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center text-black">
      My Post: {params.slug}
      <Client
        relatedDocsonfileInfo={data.relatedDocsonfileInfo}
        tradeMarkClassificationInfo={data.tradeMarkClassificationInfo}
      />
    </div>
  );
}
