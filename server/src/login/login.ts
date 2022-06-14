import { APP_BASE_PATH } from "../config/meta";
import { logger } from "../logger";
import { Express, Request } from "express";

export const setuploginRoutes = (server: Express) => {
  redirectTilLogin(server);
  success(server);
};

const redirectTilLogin = (server: Express) => {
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
    logger.info("Redirect til: " + loginTilOauth2);
    response.redirect(loginTilOauth2);
  });
};

const success = (server: Express) => {
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
      logger.info("Innlogging fullført, skal redirecte til: " + redirectString);
      response.redirect(redirectString);
    } else {
      const url = getLoginTilOauth2(process.env.APP_INGRESS);
      logger.info("Ingen gyldig Auth header, redirect til innlogging: " + url);
      response.redirect(url);
    }
  });
};

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
