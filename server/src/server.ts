import express from "express";
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
import { QbrickNoPreloadConfig } from "./config/qbrickConfigNoPreload";
import { requestLoggingMiddleware } from "./config/middleware/requestLogging";
import { correlationIdMiddleware } from "./config/middleware/correlationId";
import { logger } from "./logger";
import { requestRateLimiter } from "./config/middleware/requestRateLimiter";
import { APP_BASE_PATH, SERVER_PORT } from "./config/meta";
import { prometheus } from "./config/middleware/prometheus";
import { isProduction } from "./environment";

const initServer = () => {
  logger.info("Starting server: server.ts");
  const server = express();

  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Hva bruker vi cookieParser til?

  if (isProduction()) {
    Promise.all([initIdporten(), initTokenX()]).catch((e: Error) => {
      throw new ServerInitError(e.stack);
    });
    server.use(backendApiProxy);
    server.use(metrikkerProxy);
    server.use(kursoversiktApiProxy);
  } else {
    logger.info("Starter backendProxyMock");
    backendApiProxyMock(server);
  }

  server.get(
    `${APP_BASE_PATH}/qbrick/config/no-preload`,
    (request, response) => {
      response.setHeader("Content-Type", "application/json");
      response.send(QbrickNoPreloadConfig);
    }
  );

  server.get(`${APP_BASE_PATH}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });

  server.get(`${APP_BASE_PATH}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });

  server.listen(SERVER_PORT, () => {
    logger.info("Server listening on port " + SERVER_PORT);
  });

  return server;
};

export const server = initServer();

class ServerInitError extends Error {
  constructor(stack: string) {
    super("Server initialisation failed: " + stack);
  }
}
