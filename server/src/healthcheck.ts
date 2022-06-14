import { APP_BASE_PATH } from "./config/meta";
import { server } from "./server";

server.get(`${APP_BASE_PATH}/internal/isAlive`, (request, response) => {
  response.sendStatus(200);
});

server.get(`${APP_BASE_PATH}/internal/isReady`, (request, response) => {
  response.sendStatus(200);
});
