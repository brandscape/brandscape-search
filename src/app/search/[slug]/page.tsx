import { headers } from "next/headers";
import Client from "./client";

interface Props {
  params: { slug: string };
}
export default async function Page({ params }: Props) {
  const href = headers().get("x-current-href");
  console.log("👉", href);

  return (
    <div className="absolute w-full h-full flex flex-col items-center justify-center text-black">
      My Post: {params.slug}
      <Client />
    </div>
  );
}
