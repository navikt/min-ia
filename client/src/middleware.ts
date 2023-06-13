import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { exchangeIdportenSubjectToken } from "@navikt/tokenx-middleware";
import { randomUUID } from "crypto";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (noCorrelationIdHeaderExist(request)) {
    addCorrelationIdHeader(request);
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/api/:path*",
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
