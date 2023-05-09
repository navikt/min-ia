import { Express } from "express";
import { APP_BASE_PATH } from "./config/meta.js";

export const setupWonderwallLoginRedirect = (server: Express) => {
  server.get(`${APP_BASE_PATH}/redirect-til-login`, (request, response) => {
    const wonderwallLoginEndpoint = `${APP_BASE_PATH}/oauth2/login?redirect=${
      request.query.redirect as string
    }`;
    response.redirect(wonderwallLoginEndpoint);
  });
};
