import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import proxyRequest from "../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (!req.query.orgnr)
    return res.status(400).json({ error: "Mangler parameter 'orgnr'" });

  const orgnr = req.query.orgnr as string;
  if (!erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Ugyldig orgnr" });
  }

  return await proxyRequest(
    req,
    res,
    `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    `/sykefravarsstatistikk-api/${orgnr}/v1/sykefravarshistorikk/aggregert`,
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
