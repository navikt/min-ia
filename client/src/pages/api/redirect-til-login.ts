import type { NextApiRequest, NextApiResponse } from "next";
import { AltinnOrganisasjon } from "../../integrasjoner/altinnorganisasjon-api";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const basePath = "/min-ia";

  const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${req.query.redirect}`;
  res.redirect(basePath + `/oauth2/login?redirect=${referrerUrl}`);
}
