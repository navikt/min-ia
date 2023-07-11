import { NextApiRequest, NextApiResponse } from "next";
import proxyRequest from "../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  return await proxyRequest(
    req,
    res,
    "notifikasjon-bruker-api.fager.svc.cluster.local",
    "/api/graphql",
    process.env.NOTIFIKASJON_API_AUDIENCE,
    false
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
