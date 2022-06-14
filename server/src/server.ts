import express, {Express} from "express";
import { initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import cookieParser from "cookie-parser";
import "dotenv/config";
import {
  backendApiProxy,
  kursoversiktApiProxy,
  metrikkerProxy,
} from "./proxyMiddlewares";
import { backendApiProxyMock } from "./local/proxyMiddlewareMock";
import { requestLoggingMiddleware } from "./config/middleware/requestLogging";
import { correlationIdMiddleware } from "./config/middleware/correlationId";
import { logger } from "./logger";
import { requestRateLimiter } from "./config/middleware/requestRateLimiter";
import { SERVER_PORT } from "./config/meta";
import { prometheus } from "./config/middleware/prometheus";
import { isProduction } from "./environment";
import { isAlive, isReady } from "./healthcheck";
import {setuploginRoutes} from "./login/login";

const initServer = () => {
  logger.info("Starting server: server.ts");
  const server = express();
  isAlive(server);

  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Hva bruker vi cookieParser til?

  if (isProduction()) {
    server.use(backendApiProxy);
    server.use(metrikkerProxy);
    server.use(kursoversiktApiProxy);
    Promise.all([initIdporten(), initTokenX()]).catch((e: Error) => {
      throw new ServerInitError(e.stack);
    });
  } else {
    logger.info("Starter backendProxyMock");
    backendApiProxyMock(server);
  }

  server.listen(SERVER_PORT, () => {
    logger.info("Server listening on port " + SERVER_PORT);
  });

  isReady(server);
  return server;
};

const setupRoutes = (server: Express) => {
  setuploginRoutes(server)
}


const server = initServer();

class ServerInitError extends Error {
  constructor(stack: string) {
    super("Server initialisation failed: " + stack);
  }
}
