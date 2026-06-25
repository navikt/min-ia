import { NextApiRequest, NextApiResponse } from "next";
import proxyRequestWithTokenExchange from "../../../utils/api-proxy";
import { iaMetrikkerApiPath } from "@navikt/ia-metrikker-client";
import { anonymizeOrgnr, backendLogger } from "../../../utils/backendLogger";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });
  if (req.headers["content-type"] != "application/json") {
    return res.status(400).json({ error: "Unknown content-type" });
  }

  const responseChunks: Buffer[] = [];
  const originalWrite = res.write.bind(res);
  const originalEnd = res.end.bind(res);

  res.write = ((chunk: unknown, ...args: unknown[]) => {
    if (chunk) {
      responseChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
    }
    return originalWrite(chunk as never, ...(args as never[]));
  }) as typeof res.write;

  res.end = ((chunk: unknown, ...args: unknown[]) => {
    if (chunk) {
      responseChunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk)));
    }
    return originalEnd(chunk as never, ...(args as never[]));
  }) as typeof res.end;

  await proxyRequestWithTokenExchange(
    req,
    res,
    `${process.env.IA_TJENESTER_METRIKKER_HOSTNAME}`,
    iaMetrikkerApiPath,
    process.env.IA_TJENESTER_METRIKKER_AUDIENCE,
    true,
  );
  const responseBody = Buffer.concat(responseChunks).toString("utf8");
  backendLogger.info(
    `Metrikker proxy return code: ${res.statusCode}, body: ${anonymizeOrgnr(responseBody)}`,
  );
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
