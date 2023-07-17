import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body?.orgnr)
    return res.status(400).json({ error: "Mangler 'orgnr' i body" });
  if (!req.body?.type)
    return res.status(400).json({ error: "Mangler 'type' i body" });
  if (!req.body?.kilde)
    return res.status(400).json({ error: "Mangler 'kilde' i body" });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  return await proxyRequestWithTokenExchange(
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
    bodyParser: true,
    externalResolver: true,
  },
};
