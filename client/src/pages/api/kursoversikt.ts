import { NextApiRequest, NextApiResponse } from "next";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  await proxyApiRouteRequest({
    req,
    res,
    hostname: `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    path: "/kursoversikt/api/kurs",
    https: true,
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
