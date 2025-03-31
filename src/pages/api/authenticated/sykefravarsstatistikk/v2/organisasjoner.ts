import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../../../utils/api-proxy";
import {backendLogger} from "../../../../../utils/backendLogger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ error: "Method Not Allowed" });

  const erIProd = !(process.env.NAIS_CLUSTER_NAME === "dev-gcp" || process.env.NODE_ENV === "development");
  if (erIProd) {
    backendLogger.warn(`Endepunkt /v2/organisasjoner er ikke tilgjengelig i cluster '${process.env.NAIS_CLUSTER_NAME}' eller NODE_ENV '${process.env.NODE_ENV}'`);
    return res.status(400).json({
      error: "Endepunkt er ikke tilgjengelig"
    });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.PIA_SYKEFRAVARSSTATISTIKK_HOSTNAME}`,
    "/sykefravarsstatistikk/organisasjoner/tilgang",
    process.env.PIA_SYKEFRAVARSSTATISTIKK_AUDIENCE,
    true
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
