import { Express } from "express";
import { APP_BASE_PATH } from "./config/meta.js";

export const setupLoginRedirect = (server: Express) => {
  server.get(`${APP_BASE_PATH}/redirect-til-login`, (request, response) => {
    const wonderwallLoginEndpoint = `/oauth2/login?redirect=${
      request.query.redirect as string
    }`;
    response.redirect(wonderwallLoginEndpoint);
  });
};
