import { APP_BASE_PATH } from "./config/meta";
import { Express } from "express";

export const isAlive = (server: Express) => {
  server.get(`${APP_BASE_PATH}/internal/isAlive`, (request, response) => {
    response.sendStatus(200);
  });
};

export const isReady = (server: Express) => {
  server.get(`${APP_BASE_PATH}/internal/isReady`, (request, response) => {
    response.sendStatus(200);
  });
};
