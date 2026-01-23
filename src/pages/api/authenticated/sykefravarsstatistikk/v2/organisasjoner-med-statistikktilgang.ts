import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.PIA_SYKEFRAVARSSTATISTIKK_HOSTNAME}`,
    "/sykefravarsstatistikk/organisasjoner/enkeltrettighet",
    process.env.PIA_SYKEFRAVARSSTATISTIKK_AUDIENCE,
    false,
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
