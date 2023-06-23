import { NextApiRequest, NextApiResponse } from "next";
import { logger } from "../../../../utils/logger";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { erGyldigOrgnr } from "../../../../hooks/useOrgnr";

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
    return res.status(400).json({ error: "authentication failed" });
  }

  const data = await fetch(
    `${process.env.SYKEFRAVARSSTATISTIKK_URL}/organisasjoner/statistikk`,
    {
      headers: {
        authorization: `${newAuthToken}`,
      },
    }
  )
    .then((res) => res.json())
    .catch((reason) => {
      logger.warn(reason);
    });

  return res.status(200).json(data);
}
