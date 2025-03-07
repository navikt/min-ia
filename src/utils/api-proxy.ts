import { backendLogger } from "./backendLogger";
import { NextApiRequest, NextApiResponse } from "next";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { exchangeIdportenSubjectToken, isInvalidToken } from "./tokenx-utils";

export default async function proxyRequestWithTokenExchange(
  req: NextApiRequest,
  res: NextApiResponse,
  hostname: string,
  path: string,
  audience: string | undefined,
  useHttps: boolean,
) {
  backendLogger.info(`proxyRequestWithTokenExchange med audience '${audience}', for hostname '${hostname}' og path '${path}'`);

  if (audience === undefined) {
    backendLogger.error("audience is not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(req, audience);

  if (isInvalidToken(newAuthToken)) {
      backendLogger.info(`Token er ikke gyldig. Kan skyldes at bruker ikke er innlogget, token har gått ut eller feil ved verifisering av tokenet. Årsak: ${newAuthToken.errorType}`);
    return res.status(401).json({ error: "authentication failed" });
  } else {
    backendLogger.info(`proxyRequestWithTokenExchange, token er valid`);
  }

  await proxyApiRouteRequest({
    req,
    res,
    hostname: hostname,
    path: path,
    bearerToken: newAuthToken,
    https: useHttps,
  });
}
