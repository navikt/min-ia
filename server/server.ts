import express, { Request } from "express";
import { initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { backendApiProxy } from "./backendApiProxy";
import { backendApiProxyMock } from "./backendApiProxyMock";
import RateLimit from "express-rate-limit";

const basePath = "/min-ia";
console.log("NODE_ENV", process.env.NODE_ENV);

const server = express();

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
  server.use(cookieParser());
  console.log("Starting server: server.js");

  if (process.env.NODE_ENV === "production") {
    await Promise.all([initIdporten(), initTokenX()]);
  }

  console.log(`NODE_ENV er '${process.env.NODE_ENV}'`);
  if (process.env.NODE_ENV === "production") {
    console.log("Starter backendProxy");
    server.use(backendApiProxy);
  } else {
    console.log("Starter backendProxyMock");
    backendApiProxyMock(server);
  }

  server.get(`${basePath}/redirect-til-login`, (request, response) => {
    let redirect: string = request.query.redirect
      ? (request.query.redirect as string)
      : envProperties.APP_INGRESS;

    if (!redirect.startsWith(envProperties.APP_INGRESS)) {
      console.log(
        "[WARN] redirect starter ikke med APP_INGRESS, oppdaterer til ",
        envProperties.APP_INGRESS
      );
      redirect = envProperties.APP_INGRESS;
    }

    console.log("Kommer inn til /redirect-til-login");
    const loginTilOauth2 = getLoginTilOauth2(redirect);
    console.log("[DEBUG] redirect til: ", loginTilOauth2);
    response.redirect(loginTilOauth2);
  });

  server.get(`${basePath}/success`, (request, response) => {
    console.log("Håndterer /success");
    const harNødvendigeCookies: boolean =
      request.cookies !== undefined &&
      request.cookies["innloggingsstatus-token"] !== undefined &&
      request.cookies["io.nais.wonderwall.session"] !== undefined;
    console.log("Har vi gyldige cookies? ", harNødvendigeCookies);

    if (harAuthorizationHeader(request)) {
      const idportenToken = request.headers["authorization"]?.split(" ")[1];
      console.log("Har auth header, length=", idportenToken.length);
    } else {
      console.log("Har ingen auth header");
    }

    const redirectString = request.query.redirect as string;

    if (
      harAuthorizationHeader(request) &&
      redirectString.startsWith(process.env.APP_INGRESS)
    ) {
      console.log(
        "[DEBUG] Innlogging fullført, skal redirecte til: ",
        redirectString
      );
      response.redirect(redirectString);
    } else {
      const url = getLoginTilOauth2(envProperties.APP_INGRESS);
      console.log(
        "[DEBUG] Ingen gyldig Auth header, redirect til innlogging: ",
        url
      );
      response.redirect(url);
    }
  });

  server.get(`${basePath}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });

  server.get(`${basePath}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });

  server.listen(envProperties.PORT, () => {
    console.log("Server listening on port ", envProperties.PORT);
  });
};

startServer();
