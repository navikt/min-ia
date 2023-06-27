import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";

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

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
  );
  if (!newAuthToken) {
    return res.status(401).json({ error: "authentication failed" });
  }

  console.log("hei fra proxy til organisasjoner");
  await proxyApiRouteRequest({
    req,
    res,
    hostname: `${process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL}`.replace(
      "https://",
      ""
    ),
    path: "/sykefravarsstatistikk-api/organisasjoner",
    bearerToken: newAuthToken,
    // use https: false if you are going through service discovery
    https: true,
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
