import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hei fra aggregert");
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (!req.query.orgnr)
    return res.status(400).json({ error: "Mangler parameter 'orgnr'" });

  const orgnr = req.query.orgnr as string;
  if (!erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Ugyldig orgnr" });
  }

  if (process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE === undefined) {
    logger.error("SYKEFRAVARSSTATISTIKK_API_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }

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
    path: `/${orgnr}/v1/sykefravarshistorikk/aggregert`,
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
