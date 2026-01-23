import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";
import proxyRequestWithTokenExchange from "../../../../utils/api-proxy";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { orgnr } = req.query;

  if (typeof orgnr !== "string" || !erGyldigOrgnr(orgnr)) {
    return res.status(400).json({ error: "Mangler gyldig 'orgnr' i path" });
  }

  const hostnavn = `${process.env.FOREBYGGINGSPLAN_API_BASEURL}`;
  const sti = `/aktiviteter/orgnr/${orgnr}`;
  return await proxyRequestWithTokenExchange(
    req,
    res,
    hostnavn,
    sti,
    process.env.FOREBYGGINGSPLAN_API_AUDIENCE,
    false,
  );
}
