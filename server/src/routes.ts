import { Express } from "express";
import { setupQbrickConfigRoute } from "./config/setupQbrickConfigRoute.js";
import { setupLoginRedirect } from "./authentication.js";
import { isMockApp } from "./util/environment.js";
import {
  setupBackendApiProxy,
  setupIaTjenestermetrikkerProxy,
  setupKursoversiktApiProxy,
  setupNotifikasjonBrukerAPIProxyMock,
  applyNotifikasjonMiddleware,
} from "./config/middleware/proxyMiddleware.js";
import { backendApiProxyMock } from "./local/proxyMiddlewareMock.js";

export const setupRoutes = (server: Express) => {
  setupQbrickConfigRoute(server);

  if (isMockApp()) {
    setupNotifikasjonBrukerAPIProxyMock(server);
    backendApiProxyMock(server);
  } else {
    setupLoginRedirect(server);
    setupBackendApiProxy(server);
    setupKursoversiktApiProxy(server);
    setupIaTjenestermetrikkerProxy(server);
    applyNotifikasjonMiddleware(server);
  }
};
