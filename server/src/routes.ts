import { Express } from "express";
import { setupQbrickConfigRoute } from "./config/setupQbrickConfigRoute";
import { setupLoginRoutes } from "./login/routes";
import { isProduction } from "./util/environment";
import {
  setupBackendApiProxy,
  setupIaTjenestermetrikkerProxy,
  setupKursoversiktApiProxy, setupNotifikasjonBrukerAPIProxyMock,
    applyNotifikasjonMiddleware
} from "./config/middleware/proxyMiddleware";
import { backendApiProxyMock } from "./local/proxyMiddlewareMock";

export const setupApiRoutes = (server: Express) => {
  setupQbrickConfigRoute(server);
  setupLoginRoutes(server);

  if (isProduction()) {
    setupBackendApiProxy(server);
    setupKursoversiktApiProxy(server);
    setupIaTjenestermetrikkerProxy(server);
    applyNotifikasjonMiddleware(server)
  } else {
    setupNotifikasjonBrukerAPIProxyMock(server)
    backendApiProxyMock(server);
  }
};
