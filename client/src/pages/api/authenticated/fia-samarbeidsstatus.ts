import { NextApiRequest, NextApiResponse } from "next";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { logger } from "../../../utils/logger";
import { erGyldigOrgnr } from "../../../hooks/useOrgnr";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hei fra fia-samarbeidsstatus");
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (!req.query.orgnr)
    return res.status(400).json({ error: "Mangler parameter 'orgnr'" });

  const orgnr = req.query.orgnr as string;
  if (!erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Ugyldig orgnr" });
  }

  if (process.env.FIA_ARBEIDSGIVER_AUDIENCE === undefined) {
    logger.error("FIA_ARBEIDSGIVER_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.FIA_ARBEIDSGIVER_AUDIENCE
  );

  if (isInvalidToken(newAuthToken)) {
    return res.status(401).json({ error: "authentication failed" });
  }

  await proxyApiRouteRequest({
    req,
    res,
    hostname: `${process.env.FIA_ARBEIDSGIVER_HOSTNAME}`,
    path: `/fia-arbeidsgiver/status/${orgnr}`,
    bearerToken: newAuthToken,
    https: false,
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
