import { NextApiRequest, NextApiResponse } from "next";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { logger } from "../../../utils/logger";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  if (process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE === undefined) {
    logger.error("SYKEFRAVARSSTATISTIKK_API_AUDIENCE not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
  );
  if (!newAuthToken) {
    return res.status(400).json({ error: "authentication failed" });
  }

  await proxyApiRouteRequest({
    req,
    res,
    hostname: "notifikasjon-bruker-api.fager.svc.cluster.local",
    path: "/api/graphql",
    bearerToken: newAuthToken,
    // use https: false if you are going through service discovery
    https: false,
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};