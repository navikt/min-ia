import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    `/sykefravarsstatistikk-api/publiseringsdato`,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE,
      true
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
