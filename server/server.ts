import express from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import path, { dirname } from "path";
import { exchangeToken, initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basePath = "/min-ia";
const buildPath =
  process.env.NODE_ENV === "development"
    ? path.resolve(__dirname, "../client/dist")
    : path.resolve(__dirname, "../../client/dist");
console.log("NODE_ENV", process.env.NODE_ENV);
console.log("buildPath", buildPath);

const server = express();

const envProperties = {
  BACKEND_API_BASE_URL:
    process.env.BACKEND_API_BASE_URL || "http://localhost:8080",
  PORT: process.env.PORT || 3010,
};

const BASE_PATH = "/min-ia";
const FRONTEND_API_PATH = BASE_PATH + "/api";
const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";

const startServer = async () => {
  server.use(cookieParser());
  console.log("Starting server: server.js");

  await Promise.all([initIdporten(), initTokenX()]);

  server.use(basePath + "/", express.static(buildPath));
  server.use("/assets", express.static(`${buildPath}/assets`));

  server.get(`${basePath}/redirect-til-login`, (request, response) => {
    const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${request.query.redirect}`;
    response.redirect(basePath + `/oauth2/login?redirect=${referrerUrl}`);
  });

  server.get(`${basePath}/success`, (request, response) => {
    console.log("Håndterer /success");
    const harIdToken: boolean =
      request.cookies !== undefined &&
      request.cookies["selvbetjening-idtoken"] !== undefined;
    console.log("Har vi idtoken cookie? ", harIdToken);

    const loginserviceToken = request.cookies["selvbetjening-idtoken"];
    const redirectString = request.query.redirect as string;

    if (
      loginserviceToken &&
      redirectString.startsWith(process.env.APP_INGRESS)
    ) {
      console.log("[DEBUG] Case #1 -- Skal redirecte til: ", redirectString);
      response.redirect(redirectString);
    } else if (redirectString.startsWith(process.env.APP_INGRESS)) {
      const url = `${process.env.LOGIN_URL}${request.query.redirect}`;
      console.log("[DEBUG] Case #2 -- Skal redirecte til: ", url);
      response.redirect(url);
    } else {
      const url1 = `${process.env.LOGIN_URL}${process.env.APP_INGRESS}`;
      console.log("[DEBUG] Case #3 -- Skal redirecte til: ", url1);
      response.redirect(url1);
    }
  });

  server.get(`${basePath}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });

  server.get(`${basePath}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });

  const proxyOptions: Options = {
    target: BACKEND_API_BASE_URL,
    changeOrigin: true,
    pathRewrite: (path) => {
      return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
    },
    router: async (req) => {
      if (process.env.NODE_ENV === "labs-gcp") {
        // I labs så returnerer vi mock uansett
        return undefined;
      }
      const tokenSet = await exchangeToken(req);
      if (!tokenSet?.expired() && tokenSet?.access_token) {
        req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
      }
      return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: "debug",
  };

  const proxy = createProxyMiddleware(FRONTEND_API_PATH, proxyOptions);

  server.use(proxy);

  server.listen(envProperties.PORT, () => {
    console.log("Server listening on port ", envProperties.PORT);
  });
};

startServer();
