import { Request } from "express";
import { randomUUID } from "crypto";

export const correlationIdMiddleware = (req: Request, res, next) => {
  if (noCorrelationIdHeaderExists(req)) {
    addCorrelationIdHeader(req);
  }
  next();
};

export const getCorrelationIdHeader = (req: Request) => {
  return req.headers["X-Correlation-ID"];
};

const addCorrelationIdHeader = (req: Request) => {
  req.headers["X-Correlation-ID"] = randomUUID();
};

const noCorrelationIdHeaderExists = (req): boolean => {
  return getCorrelationIdHeader(req) === undefined;
};
