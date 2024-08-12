const handler = (req: Request) => {
  console.log("👉 req", req);

  return Response.json({ message: "hello search GET API" });
};

export { handler as GET };
// export async function GET(request: NextApiRequest) {
//   console.log("GET request", request);
//   return Response.json({ message: "hello Search GET API" });
// }
