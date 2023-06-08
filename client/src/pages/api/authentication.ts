import { APP_BASE_PATH } from "../../constants";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const wonderwallLoginEndpoint = `${APP_BASE_PATH}/oauth2/login?redirect=${
    req.query.redirect as string
  }`;
  res.redirect(wonderwallLoginEndpoint);
}
