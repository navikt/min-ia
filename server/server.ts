import express from "express";
import path, { dirname } from "path";
import { initTokenX } from "./tokenx";
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
const port = process.env.PORT || 8080;

const startServer = async (html) => {
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

    if (request.cookies["selvbetjening-idtoken"] !== undefined) {
      const loginserviceToken = request.cookies["selvbetjening-idtoken"];
      const redirectString = request.query.redirect as string;
      if (
        loginserviceToken &&
        redirectString.startsWith(process.env.APP_INGRESS)
      ) {
        response.redirect(redirectString);
      } else if (redirectString.startsWith(process.env.APP_INGRESS)) {
        response.redirect(`${process.env.LOGIN_URL}${request.query.redirect}`);
      } else {
        response.redirect(`${process.env.LOGIN_URL}${process.env.APP_INGRESS}`);
      }
    } else {
      console.log(request.cookies);
      console.log(document.cookie.split(";"));
    }
  });

  server.get(`${basePath}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });

  server.get(`${basePath}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });

  server.listen(port, () => {
    console.log("Server listening on port ", port);
  });
};

startServer("");
