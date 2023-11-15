import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { aktivitetId, orgnr } = req.query;
  const { status } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (typeof aktivitetId !== "string") {
    return res.status(400).json({ error: "Mangler 'aktivitetId' i path" });
  }

  if (typeof orgnr !== "string" || !erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Mangler gyldig 'orgnr' i path" });
  }

  if (typeof status !== "string") {
    return res.status(400).json({ error: "Mangler 'status' i body" });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.FOREBYGGINGSPLAN_API_BASEURL}`,
    `/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`,
    process.env.FOREBYGGINGSPLAN_API_AUDIENCE,
    false
  );
}
