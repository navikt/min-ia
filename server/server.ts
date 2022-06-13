import express, { Request } from "express";
import promBundle from "express-prom-bundle";
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
import RateLimit from "express-rate-limit";
import { QbrickNoPreloadConfig } from "./config/qbrickConfigNoPreload";
import morgan from "morgan";
import { randomUUID } from "crypto";

const logKibanaFriendly = (
  level: string,
  message: string,
  correlationId?: string
) => {
  process.stdout.write(
    JSON.stringify({
      level,
      message,
      correlationId,
    })
  );
};

const createLogger = (correlationId?: string) => {
  return {
    warning(message: string) {
      logKibanaFriendly("Warning", message, correlationId);
    },
    info(message: string) {
      logKibanaFriendly("Info", message, correlationId);
    },
    debug(message: string) {
      logKibanaFriendly("Debug", message, correlationId);
    },
  };
};
const kibanaLogger = createLogger();

function skipRequestLogging(req: Request) {
  const url = req.originalUrl;
  return url?.includes("/internal/");
}

const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

morgan.token("kibana-friendly", (req, res) => {
  return JSON.stringify({
    level: "",
  });
});

const basePath = "/min-ia";
kibanaLogger.info("NODE_ENV" + process.env.NODE_ENV);

const server = express();

const getCorrelationIdHeader = (req: Request) => {
  return req.headers["X-Correlation-ID"];
};

const addCorrelationIdHeader = (req: Request) => {
  console.log("LOGGING SKIPPES")
  req.headers["X-Correlation-ID"] = randomUUID();
};

const noCorrelationIdHeaderExists = (req): boolean => {
  return getCorrelationIdHeader(req) === undefined;
};

const correlationIdMiddleware = (req: Request, res, next) => {
  if (noCorrelationIdHeaderExists(req)) {
    addCorrelationIdHeader(req);
  }
  next();
};

server.use(correlationIdMiddleware);
server.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        level: "info",
        message: [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
          tokens.res(req, res, "content-length"),
          "-",
          tokens["response-time"](req, res),
          "ms",
        ].join(" "),
        correlationId: getCorrelationIdHeader(req),
      });
    },
    { skip: skipRequestLogging }
  )
);

const prometheus = promBundle({
  includePath: true,
  metricsPath: `${basePath}/internal/metrics`,
});

// set up rate limiter: maximum of 20 000 requests per minute
const limiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20000,
});
server.use(limiter);

const envProperties = {
  APP_INGRESS: process.env.APP_INGRESS || "http://localhost:3000/min-ia",
  PORT: process.env.PORT || 3010,
};

const getLoginTilOauth2 = (redirectUrl: string): string => {
  const referrerUrl = `${envProperties.APP_INGRESS}/success?redirect=${redirectUrl}`;
  return `${basePath}/oauth2/login?redirect=${referrerUrl}`;
};

const harAuthorizationHeader = (request: Request) => {
  return (
    request.headers["authorization"] &&
    request.headers["authorization"] !== undefined &&
    request.headers["authorization"]?.split(" ")[1]!.length > 0
  );
};

const startServer = async () => {
  // server.use(loggingMiddleware);
  server.use(cookieParser());
  server.use(prometheus);
  kibanaLogger.info("Starting server: server.js");
  // TODO: Samle alle kodesnutter som krever process.env.NODE_ENV === "production"

  if (process.env.NODE_ENV === "production") {
    await Promise.all([initIdporten(), initTokenX()]);
  }

  kibanaLogger.info(`NODE_ENV er '${process.env.NODE_ENV}'`);

  if (process.env.NODE_ENV === "production") {
    server.use(backendApiProxy);
    server.use(metrikkerProxy);
    server.use(kursoversiktApiProxy);
  } else {
    kibanaLogger.info("Starter backendProxyMock");
    backendApiProxyMock(server);
  }

  server.get(`${basePath}/redirect-til-login`, (request, response) => {
    let redirect: string = request.query.redirect
      ? (request.query.redirect as string)
      : envProperties.APP_INGRESS;

    if (!redirect.startsWith(envProperties.APP_INGRESS)) {
      kibanaLogger.info(
        "[WARN] redirect starter ikke med APP_INGRESS, oppdaterer til " +
          envProperties.APP_INGRESS
      );
      redirect = envProperties.APP_INGRESS;
    }

    const loginTilOauth2 = getLoginTilOauth2(redirect);
    kibanaLogger.info("[INFO] redirect til: " + loginTilOauth2);
    response.redirect(loginTilOauth2);
  });

  server.get(`${basePath}/success`, (request, response) => {
    kibanaLogger.info("Håndterer /success");
    const harNødvendigeCookies: boolean =
      request.cookies !== undefined &&
      request.cookies["innloggingsstatus-token"] !== undefined &&
      request.cookies["io.nais.wonderwall.session"] !== undefined;
    kibanaLogger.info("Har vi gyldige cookies? " + harNødvendigeCookies);

    if (harAuthorizationHeader(request)) {
      const idportenToken = request.headers["authorization"]?.split(" ")[1];
      kibanaLogger.info("Har auth header, length=" + idportenToken.length);
    } else {
      kibanaLogger.info("Har ingen auth header");
    }

    const redirectString = request.query.redirect as string;

    if (
      harAuthorizationHeader(request) &&
      redirectString.startsWith(process.env.APP_INGRESS)
    ) {
      kibanaLogger.info(
        "[INFO] Innlogging fullført, skal redirecte til: " + redirectString
      );
      response.redirect(redirectString);
    } else {
      const url = getLoginTilOauth2(envProperties.APP_INGRESS);
      kibanaLogger.info(
        "[INFO] Ingen gyldig Auth header, redirect til innlogging: " + url
      );
      response.redirect(url);
    }
  });

  server.get(`${basePath}/qbrick/config/no-preload`, (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.send(QbrickNoPreloadConfig);
  });

  server.get(`${basePath}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });

  server.get(`${basePath}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });

  server.listen(envProperties.PORT, () => {
    kibanaLogger.info("Server listening on port " + envProperties.PORT);
  });
};

startServer();
