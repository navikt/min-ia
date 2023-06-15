import { NextApiRequest, NextApiResponse } from "next";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { logger } from "../../../utils/logger";
import { METRIKKER_BASE_PATH } from "../../../utils/konstanter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.body.orgnr)
    return res.status(400).json({ error: "Mangler 'orgnr' i body" });
  if (!req.body.type)
    return res.status(400).json({ error: "Mangler 'type' i body" });
  if (!req.body.kilde)
    return res.status(400).json({ error: "Mangler 'kilde' i body" });

  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const requestBody = JSON.parse(
    JSON.stringify({
      orgnr: req.body.orgnr,
      type: req.body.type,
      kilde: req.body.kilde,
    })
  );

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

  const data = await fetch(
    `${process.env.IA_TJENESTER_METRIKKER_BASE_URL}/innlogget/mottatt-iatjeneste`,
    {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${newAuthToken}`,
      },
    }
  )
    .then((res) => res.json())
    .catch(logger.warn);

  return res.status(200).json(data);
}
