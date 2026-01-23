import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../utils/api-proxy";
import { iaMetrikkerApiPath } from "@navikt/ia-metrikker-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (req.headers["content-type"] != "application/json") {
    return res.status(400).json({ error: "Unknown content-type" });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}`,
    iaMetrikkerApiPath,
    process.env.IA_TJENESTER_METRIKKER_AUDIENCE,
    true,
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
