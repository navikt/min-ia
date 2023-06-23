import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { logger } from "./utils/logger";
import { isMockApp } from "./utils/envUtils";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";

export const runtime = "nodejs";

export async function middleware(request: NextRequest) {
  console.log("HELLO");
  console.log(request.nextUrl.pathname);

  if (noCorrelationIdHeaderExist(request)) {
    addCorrelationIdHeader(request);
  }

  if (isMockApp()) {
    console.log("mock app");
  } else {
    console.log("real app");
    console.log(request.nextUrl.pathname.includes("/authenticated/"));
  }

  if (
    request.nextUrl.pathname.startsWith(
      "/api/authenticated/sykefravarsstatistikk"
    )
  ) {
    console.log("sykefravarsstatistikk");
  }
}

export const config = {
  matcher: "/api/authenticated/:path*",
};

const noCorrelationIdHeaderExist = (req: NextRequest): boolean => {
  req.headers.get("X-Correlation-ID");

  return getCorrelationIdHeader(req) === undefined;
};

export const getCorrelationIdHeader = (req: NextRequest) => {
  return req.headers.get("X-Correlation-ID");
};

const addCorrelationIdHeader = (req: Request) => {
  req.headers.set("X-Correlation-ID", randomUUID());
};
