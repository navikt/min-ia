import { NextApiRequest, NextApiResponse } from "next";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { logger } from "../../../utils/logger";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import proxyRequest from "../../../utils/api-proxy";

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

  return await proxyRequest(
    req,
    res,
    `${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}`,
    "/ia-tjenester-metrikker/innlogget/mottatt-iatjeneste",
    process.env.IA_TJENESTER_METRIKKER_AUDIENCE,
    true
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
