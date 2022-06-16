import { APP_BASE_PATH } from "../config/meta";
import { Express } from "express";
import { redirectToLogin } from "./redirectTilLoginService";
import { redirectTilAppHvisInnloggingOk } from "./successService";

export const setupLoginRoutes = (server: Express) => {
  redirectTilLogin(server);
  success(server);
};

const redirectTilLogin = (server: Express) => {
  server.get(`${APP_BASE_PATH}/redirect-til-login`, (request, response) => {
    redirectToLogin(request, response);
  });
};

const success = (server: Express) => {
  server.get(`${APP_BASE_PATH}/success`, (request, response) => {
    redirectTilAppHvisInnloggingOk(request, response);
  });
};