import { Express } from "express";
import { APP_BASE_PATH } from "../config/meta.js";
import { redirectToLogin } from "./redirectTilLoginService.js";
import { redirectTilAppHvisInnloggingOk } from "./successService.js";

export const setupLoginRoutes = (server: Express) => {
  server.get(`${APP_BASE_PATH}/redirect-til-login`, (request, response) => {
    redirectToLogin(request, response);
  });

  server.get(`${APP_BASE_PATH}/success`, (request, response) => {
    redirectTilAppHvisInnloggingOk(request, response);
  });
};

