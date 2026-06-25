import { backendLogger } from "./backendLogger";
import { NextApiRequest, NextApiResponse } from "next";
import { proxyApiRouteRequest } from "@navikt/next-api-proxy";
import { exchangeIdportenSubjectToken, isInvalidToken } from "./tokenx-utils";

function anonymizeOrgnr(path: string): string {
  return path.replace(/\d{9}/g, "*********");
}

export default async function proxyRequestWithTokenExchange(
  req: NextApiRequest,
  res: NextApiResponse,
  hostname: string,
  path: string,
  audience: string | undefined,
  useHttps: boolean,
) {
  if (audience === undefined) {
    backendLogger.error("audience is not set");
    return res.status(500).json({ error: "authentication failed" });
  }

  const newAuthToken = await exchangeIdportenSubjectToken(req, audience);

  if (isInvalidToken(newAuthToken)) {
    backendLogger.info(
      `Token er ikke gyldig. Kan skyldes at bruker ikke er innlogget, token har gått ut eller feil ved verifisering av tokenet. Årsak: ${newAuthToken.errorType}`,
    );
    return res.status(401).json({ error: "authentication failed" });
  }

  try {
    await proxyApiRouteRequest({
      req,
      res,
      hostname: hostname,
      path: path,
      bearerToken: newAuthToken,
      https: useHttps,
    });
    
    backendLogger.info(
      `Proxy request succeeded. Hostname: ${hostname}, Path: ${anonymizeOrgnr(path)}, Status: ${res.statusCode}`,
    );
  } catch (error) {
    backendLogger.error(
      `Proxy request failed. Hostname: ${hostname}, Path: ${anonymizeOrgnr(path)}, Error: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}
