import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import proxyRequest from "../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  if (process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE === undefined) {
    logger.error("SYKEFRAVARSSTATISTIKK_API_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  return await proxyRequest(
    req,
    res,
    `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    "/sykefravarsstatistikk-api/organisasjoner/statistikk",
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
