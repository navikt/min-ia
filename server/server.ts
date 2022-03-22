import express from "express";
import path, { dirname } from "path";
import { initTokenX } from "./tokenx";
import { initIdporten } from "./idporten";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import "dotenv/config";
import { backendApiProxy } from "./backendApiProxy";
import { backendApiProxyMock } from "./backendApiProxyMock";

const basePath = "/min-ia";
console.log("NODE_ENV", process.env.NODE_ENV);

const server = express();

const envProperties = {
  PORT: process.env.PORT || 3010,
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
    console.log("Kommer inn til /redirect-til-login");
    const referrerUrl = `${process.env.APP_INGRESS}/success?redirect=${request.query.redirect}`;
    response.redirect(basePath + `/oauth2/login?redirect=${referrerUrl}`);
  });

  server.get(`${basePath}/success`, (request, response) => {
    console.log("Håndterer /success");
    const harGyldigeCookies: boolean =
      request.cookies !== undefined &&
      request.cookies["innloggingsstatus-token"] !== undefined &&
      request.cookies["io.nais.wonderwall.session"] !== undefined;
    console.log("Har vi gyldige cookies? ", harGyldigeCookies);

    const harAuthorizationHeader: boolean =
      request.header("authorization") &&
      request.header("authorization") !== undefined;

    if (harAuthorizationHeader) {
      const idportenToken = request.headers["authorization"]?.split(" ")[1];
      console.log("Har auth header, length=", idportenToken!.length);
    } else {
      console.log("Har ingen auth header");
    }

    //const loginserviceToken = request.cookies["selvbetjening-idtoken"];
    const redirectString = request.query.redirect as string;

    if (
      harGyldigeCookies &&
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

  server.listen(envProperties.PORT, () => {
    console.log("Server listening on port ", envProperties.PORT);
  });
};

startServer();
