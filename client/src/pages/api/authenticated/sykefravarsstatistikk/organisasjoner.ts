import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hei fra organisasjoner");
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  if (process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE === undefined) {
    logger.error("SYKEFRAVARSSTATISTIKK_API_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }
  console.log("hei fra organisasjoner, etter audience check");

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
  );

  if (isInvalidToken(newAuthToken)) {
    return res.status(401).json({ error: "authentication failed" });
  }

  await proxyApiRouteRequest({
    req,
    res,
    hostname: `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    path: "/sykefravarsstatistikk-api/organisasjoner",
    bearerToken: newAuthToken,
    https: true,
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
