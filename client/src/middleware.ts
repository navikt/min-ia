import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { logger } from "./utils/logger";

export async function middleware(request: NextRequest) {
  logger.info(request);

  if (noCorrelationIdHeaderExist(request)) {
    addCorrelationIdHeader(request);
  }
  if (request.nextUrl.pathname === "/api/authenticated/notifikasjoner") {
    console.log("hei fra middleware som har fanget notifikasjoner");
  }
  return NextResponse.next();
}

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
