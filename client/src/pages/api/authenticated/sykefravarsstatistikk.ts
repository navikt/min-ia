import { NextRequest, NextResponse } from "next/server";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { logger } from "../../../utils/logger";

export default async function handler(req: NextRequest, res: NextResponse) {
  if (process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE === undefined) {
    logger.error("SYKEFRAVARSSTATISTIKK_API_AUDIENCE not set");
    return new NextResponse(
      JSON.stringify({ error: "kunne ikke hente sykefraværsstatistikk" }),
      {
        status: 500,
      }
    );
  }

  await exchangeIdportenSubjectToken(
    req,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
  );

  return NextResponse.rewrite(new URL("/sykefravarsstatistikk-api", req.url));
}
