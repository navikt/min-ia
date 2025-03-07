import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../utils/api-proxy";
import {backendLogger} from "../../../../utils/backendLogger";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
  backendLogger.info(`[DEBUG] mottok request på endepunkt /api/authenticated/sykefravarsstatistikk/aggregert`);
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (!req.query.orgnr)
    return res.status(400).json({ error: "Mangler parameter 'orgnr'" });

  const orgnr = req.query.orgnr as string;
  if (!erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Ugyldig orgnr" });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.SYKEFRAVARSSTATISTIKK_API_HOSTNAME}`,
    `/sykefravarsstatistikk-api/${orgnr}/v1/sykefravarshistorikk/aggregert`,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE,
    true,
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
