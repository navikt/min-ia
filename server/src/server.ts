import express from "express";
import cookieParser from "cookie-parser";
import { initTokenX } from "./tokenx.js";
import { initIdporten } from "./idporten.js";
import { requestLoggingMiddleware } from "./config/middleware/requestLogging.js";
import { correlationIdMiddleware } from "./config/middleware/correlationId.js";
import { logger } from "./util/logger.js";
import { requestRateLimiter } from "./config/middleware/requestRateLimiter.js";
import { SERVER_PORT } from "./config/meta.js";
import { prometheus } from "./config/middleware/prometheus.js";
import { isAlive, isReady } from "./healthcheck.js";
import { isMockApp } from "./util/environment";
import {
  applyNotifikasjonMiddleware,
  setupBackendApiProxy,
  setupFiaArbeidsgiverProxy,
  setupIaTjenestermetrikkerProxy,
  setupKursoversiktApiProxy,
  setupNotifikasjonBrukerAPIProxyMock,
} from "./config/middleware/proxyMiddleware";
import { backendApiProxyMock } from "./local/proxyMiddlewareMock";
import { setupWonderwallLoginRedirect } from "./authentication";

const initServer = async () => {
  logger.info(
    "Starting server (server.ts) on Node environment " + process.env.NODE_ENV
  );
  const server = express();

  isAlive(server);
  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Bruker vi cookieParseren lenger?

  if (isMockApp()) {
    setupNotifikasjonBrukerAPIProxyMock(server);
    backendApiProxyMock(server);
  } else {
    /*
    await initIdporten();
    await initTokenX();
    setupWonderwallLoginRedirect(server);
    setupBackendApiProxy(server);
    setupKursoversiktApiProxy(server);
    setupIaTjenestermetrikkerProxy(server);
    setupFiaArbeidsgiverProxy(server);
    applyNotifikasjonMiddleware(server);
     */
  }

  server.listen(SERVER_PORT, () => {
    logger.info("Server listening on port " + SERVER_PORT);
  });
  isReady(server);
};

initServer().catch((e: Error) => {
  throw new ServerInitError(e.stack);
});

class ServerInitError extends Error {
  constructor(stack: string) {
    super("Server initialisation failed: " + stack);
  }
}
