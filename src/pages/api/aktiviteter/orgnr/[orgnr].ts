import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { orgnr } = req.query;

  if (typeof orgnr !== "string" || !erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Mangler gyldig 'orgnr' i path" });
  }

  return await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.FOREBYGGINGSPLAN_API_BASEURL}`,
    `/aktiviteter/orgnr/${orgnr}`,
    process.env.FOREBYGGINGSPLAN_API_AUDIENCE,
    false
  );
}
