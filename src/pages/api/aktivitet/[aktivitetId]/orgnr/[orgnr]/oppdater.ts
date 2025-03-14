import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../../../hooks/useOrgnr";
import {anonymizeOrgnr, backendLogger} from "../../../../../../utils/backendLogger";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "../../../../../../utils/tokenx-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
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

  if (process.env.FOREBYGGINGSPLAN_API_AUDIENCE === undefined) {
    backendLogger.error("audience is not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.FOREBYGGINGSPLAN_API_AUDIENCE,
  );

  if (isInvalidToken(newAuthToken)) {
    backendLogger.error("token is invalid");
    return res.status(401).json({ error: "authentication failed" });
  }

  const oppdaterUrl = `http://${process.env.FOREBYGGINGSPLAN_API_BASEURL}/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`;
  backendLogger.info(`Kaller oppdatering av aktivitet på URL '${anonymizeOrgnr(oppdaterUrl)}'`);
  const respons = await fetch(
      oppdaterUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAuthToken}`,
      },
      body: JSON.stringify({ status, aktivitetstype: "OPPGAVE" }),
    },
  );

  backendLogger.info(`Fikk følgende status på /oppdater: '${respons.status}'`);
  return res.status(respons.status).json({ status: respons.status });
}
