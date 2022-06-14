import express, { Express } from "express";
import { initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import cookieParser from "cookie-parser";
import "dotenv/config";
import {
  setupBackendApiProxy,
  setupKursoversiktApiProxy,
  setupIaTjenestermetrikkerProxy,
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
import { setupLoginRoutes } from "./login/login";
import { setupQbrickConfigRoute } from "./config/setupQbrickConfigRoute";

const initServer = async () => {
  logger.info("Starting server: server.ts");
  const server = express();
  isAlive(server);

  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Bruker vi cookieParseren lenger?

  await initIdporten();
  await initTokenX();

  server.listen(SERVER_PORT, () => {
    logger.info("Server listening on port " + SERVER_PORT);
  });

  setupApiRoutes(server);
  isReady(server);
};

initServer().catch((e: Error) => {
  throw new ServerInitError(e.stack);
});

const setupApiRoutes = (server: Express) => {
  setupQbrickConfigRoute(server);
  setupLoginRoutes(server);

  if (isProduction()) {
    server.use(setupBackendApiProxy);
    server.use(setupKursoversiktApiProxy);
    server.use(setupIaTjenestermetrikkerProxy);
  } else {
    backendApiProxyMock(server);
  }
};

class ServerInitError extends Error {
  constructor(stack: string) {
    super("Server initialisation failed: " + stack);
  }
}
