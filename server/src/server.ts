import express, { Request } from "express";
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
import { requestLoggingMiddleware } from "./middleware/requestLogging";
import { correlationIdMiddleware } from "./middleware/correlationId";
import { logger } from "./logger";
import { requestRateLimiter } from "./middleware/requestRateLimiter";
import { APP_BASE_PATH, SERVER_PORT } from "./config/meta";
import { prometheus } from "./middleware/prometheus";

const getLoginTilOauth2 = (redirectUrl: string): string => {
  const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${redirectUrl}`;
  return `${APP_BASE_PATH}/oauth2/login?redirect=${referrerUrl}`;
};

const harAuthorizationHeader = (request: Request) => {
  return (
    request.headers["authorization"] &&
    request.headers["authorization"] !== undefined &&
    request.headers["authorization"]?.split(" ")[1]!.length > 0
  );
};

const startServer = async () => {
  logger.info("Starting server: server.ts");
  const server = express();

  server.use(correlationIdMiddleware);
  server.use(requestLoggingMiddleware);
  server.use(prometheus);
  server.use(requestRateLimiter);
  server.use(cookieParser()); // Hva bruker vi cookieParser til?

  if (isProduction()) {
    await Promise.all([initIdporten(), initTokenX()]);
    server.use(backendApiProxy);
    server.use(metrikkerProxy);
    server.use(kursoversiktApiProxy);
  } else {
    logger.info("Starter backendProxyMock");
    backendApiProxyMock(server);
  }

  server.get(`${APP_BASE_PATH}/redirect-til-login`, (request, response) => {
    let redirect: string = request.query.redirect
      ? (request.query.redirect as string)
      : process.env.APP_INGRESS;

    if (!redirect.startsWith(process.env.APP_INGRESS)) {
      logger.warning(
        "Redirect starter ikke med APP_INGRESS, oppdaterer til " +
          process.env.APP_INGRESS
      );
      redirect = process.env.APP_INGRESS;
    }

    const loginTilOauth2 = getLoginTilOauth2(redirect);
    logger.info("[INFO] redirect til: " + loginTilOauth2);
    response.redirect(loginTilOauth2);
  });

  server.get(`${APP_BASE_PATH}/success`, (request, response) => {
    logger.info("Håndterer /success");
    const harNødvendigeCookies: boolean =
      request.cookies !== undefined &&
      request.cookies["innloggingsstatus-token"] !== undefined &&
      request.cookies["io.nais.wonderwall.session"] !== undefined;
    logger.info("Har vi gyldige cookies? " + harNødvendigeCookies);

    if (harAuthorizationHeader(request)) {
      const idportenToken = request.headers["authorization"]?.split(" ")[1];
      logger.info("Har auth header, length=" + idportenToken.length);
    } else {
      logger.info("Har ingen auth header");
    }

    const redirectString = request.query.redirect as string;

    if (
      harAuthorizationHeader(request) &&
      redirectString.startsWith(process.env.APP_INGRESS)
    ) {
      logger.info(
        "[INFO] Innlogging fullført, skal redirecte til: " + redirectString
      );
      response.redirect(redirectString);
    } else {
      const url = getLoginTilOauth2(process.env.APP_INGRESS);
      logger.info(
        "[INFO] Ingen gyldig Auth header, redirect til innlogging: " + url
      );
      response.redirect(url);
    }
  });

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
};

startServer();
