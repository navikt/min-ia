import { NextApiRequest, NextApiResponse } from "next";
import { erGyldigOrgnr } from "../../../../../../hooks/useOrgnr";
import {
  exchangeIdportenSubjectToken,
  isInvalidToken,
} from "@navikt/tokenx-middleware";
import { backendLogger } from "../../../../../../utils/backendLogger";

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

  if (process.env.FOREBYGGINGSPLAN_API_AUDIENCE === undefined) {
    backendLogger.error("audience is not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(
    req,
    process.env.FOREBYGGINGSPLAN_API_AUDIENCE
  );

  if (isInvalidToken(newAuthToken)) {
    backendLogger.error("token is invalid");
    return res.status(401).json({ error: "authentication failed" });
  }

  const respons = await fetch(
    `http://${process.env.FOREBYGGINGSPLAN_API_BASEURL}/aktivitet/${aktivitetId}/orgnr/${orgnr}/oppdater`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAuthToken}`,
      },
      body: JSON.stringify({ status, aktivitetstype: "OPPGAVE" }),
    }
  );

  return res.status(respons.status).json({ status: respons.status });
}
