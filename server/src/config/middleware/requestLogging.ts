import { Request } from "express";
import morgan from "morgan";
import { getCorrelationIdHeader } from "./correlationId";

export const requestLoggingMiddleware = morgan(
  (tokens, req, res) => {
    return JSON.stringify({
      level: "info",
      message: writeRequestLogMessage(tokens, req, res),
      correlationId: getCorrelationIdHeader(req),
    });
  },
  { skip: skipAllInternalRequests }
);

function writeRequestLogMessage(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    "(" + tokens.res(req, res, "content-length") + ")",
    "- " + tokens["response-time"](req, res) + "ms",
  ].join(" ");
}

function skipAllInternalRequests(req: Request) {
  return req.originalUrl?.includes("/internal/");
}
