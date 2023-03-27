import { Express } from "express";
import { setupQbrickConfigRoute } from "./config/setupQbrickConfigRoute.js";
import { setupLoginRoutes } from "./login/routes.js";
import { isMockApp } from "./util/environment.js";
import {
  setupBackendApiProxy,
  setupIaTjenestermetrikkerProxy,
  setupKursoversiktApiProxy,
  setupNotifikasjonBrukerAPIProxyMock,
  applyNotifikasjonMiddleware,
} from "./config/middleware/proxyMiddleware.js";
import { backendApiProxyMock } from "./local/proxyMiddlewareMock.js";

export const setupApiRoutes = (server: Express) => {
  setupQbrickConfigRoute(server);
  setupLoginRoutes(server);

  if (isMockApp()) {
    setupNotifikasjonBrukerAPIProxyMock(server);
    backendApiProxyMock(server);
  } else {
    setupBackendApiProxy(server);
    setupKursoversiktApiProxy(server);
    setupIaTjenestermetrikkerProxy(server);
    applyNotifikasjonMiddleware(server);
  }
};
