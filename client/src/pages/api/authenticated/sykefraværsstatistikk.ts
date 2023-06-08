import { NextRequest, NextResponse } from "next/server";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";

export default function handler(req: NextRequest, res: NextResponse) {
  exchangeIdportenSubjectToken(
    req,
    process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
  );
}
