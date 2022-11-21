import express from "express";
import { initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { requestLoggingMiddleware } from "./config/middleware/requestLogging";
import { correlationIdMiddleware } from "./config/middleware/correlationId";
import { logger } from "./util/logger";
import { requestRateLimiter } from "./config/middleware/requestRateLimiter";
import { SERVER_PORT } from "./config/meta";
import { prometheus } from "./config/middleware/prometheus";
import { isAlive, isReady } from "./healthcheck";
import { setupApiRoutes } from "./routes";

const initServer = async () => {
  logger.info("Starting server (server.ts) on Node environment " + process.env.NODE_ENV);
  const server = express();
  isAlive(server);

  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Bruker vi cookieParseren lenger?

  await initIdporten();
  await initTokenX();

  setupApiRoutes(server);

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
