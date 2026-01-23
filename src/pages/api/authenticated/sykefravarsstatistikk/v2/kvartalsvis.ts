import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../../utils/api-proxy";
import { backendLogger } from "../../../../../utils/backendLogger";

/*
 *  Handler som mapper request til frackend (/api/authenticated/sykefravarsstatistikk/v2/kvartalsvis?orgnr={orgnr}
 *   til pia-sykefravarsstistikk -> /{orgnr}/sykefravarshistorikk/kvartalsvis
 *  Endepunktet returnerer sykefraværsstatistikk per kvartal (siste 5 årene)
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (!req.query.orgnr)
    return res.status(400).json({ error: "Mangler parameter 'orgnr'" });

  const orgnr = req.query.orgnr as string;
  if (!erGyldigOrgnr(orgnr)) {
    backendLogger.info(
      `Endepunkt /v2/kvartalsvis fikk et ugyldig orgnr '${orgnr}'. Returner Bad Request`,
    );
    return res.status(400).json({ error: "Ugyldig orgnr" });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.PIA_SYKEFRAVARSSTATISTIKK_HOSTNAME}`,
    `/sykefravarsstatistikk/${orgnr}/historikk/kvartalsvis`,
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
