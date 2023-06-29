import { NextApiRequest, NextApiResponse } from "next";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { logger } from "../../../utils/logger";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.orgnr)
    return res.status(400).json({ error: "Mangler 'orgnr' i body" });
  if (!req.body.type)
    return res.status(400).json({ error: "Mangler 'type' i body" });
  if (!req.body.kilde)
    return res.status(400).json({ error: "Mangler 'kilde' i body" });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const requestBody = JSON.parse(
    JSON.stringify({
      orgnr: req.body.orgnr,
      type: req.body.type,
      kilde: req.body.kilde,
    })
  );

  if (process.env.IA_TJENESTER_METRIKKER_AUDIENCE === undefined) {
    logger.error("IA_TJENESTER_METRIKKER_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.IA_TJENESTER_METRIKKER_AUDIENCE
  );
  if (!newAuthToken) {
    return res.status(401).json({ error: "authentication failed" });
  }

  await proxyApiRouteRequest({
    req,
    res,
    hostname: `${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}`,
    path: "/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste",
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
