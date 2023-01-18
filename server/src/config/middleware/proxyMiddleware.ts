import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "../../tokenx";
import { Express } from "express";
import { applyNotifikasjonMockMiddleware } from "@navikt/arbeidsgiver-notifikasjoner-brukerapi-mock";

const FRONTEND_API_PATH = "/forebygge-fravar/api";
const FRONTEND_METRIKKER_PATH = "/forebygge-fravar/metrikker";
const FRONTEND_KURSOVERSIKT_PATH = "/forebygge-fravar/kursoversikt";
const KURSOVERSIKT_API_PATH = "/api/kurs";
const { NOTIFIKASJON_API_AUDIENCE } = process.env;

const backendApiProxyOptions: Options = {
  target: process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: { [FRONTEND_API_PATH]: "/sykefravarsstatistikk-api" },
  router: async (req) => {
    const tokenSet = await exchangeToken(
      req,
      process.env.SYKEFRAVARSSTATISTIKK_API_AUDIENCE
    );
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
    }
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

// TODO: Bli kvitt duplikat kode
const iaTjenestemetrikkerProxyOptions: Options = {
  target: process.env.IA_TJENESTER_METRIKKER_BASE_URL,
  changeOrigin: true,
  pathRewrite: { [FRONTEND_METRIKKER_PATH]: "" },
  router: async (req) => {
    const tokenSet = await exchangeToken(
      req,
      process.env.IA_TJENESTER_METRIKKER_AUDIENCE
    );
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
    }
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

const kursoveriktProxyOptions: Options = {
  target: process.env.KURSOVERSIKT_BASE_URL,
  changeOrigin: true,
  pathRewrite: { [FRONTEND_KURSOVERSIKT_PATH]: KURSOVERSIKT_API_PATH },
  router: async (req) => {
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

export const setupBackendApiProxy = (server: Express) => {
  server.use(createProxyMiddleware(FRONTEND_API_PATH, backendApiProxyOptions));
};

export const setupKursoversiktApiProxy = (server: Express) => {
  server.use(
    createProxyMiddleware(FRONTEND_KURSOVERSIKT_PATH, kursoveriktProxyOptions)
  );
};

export const setupIaTjenestermetrikkerProxy = (server: Express) => {
  server.use(
    createProxyMiddleware(
      FRONTEND_METRIKKER_PATH,
      iaTjenestemetrikkerProxyOptions
    )
  );
};

export const setupNotifikasjonBrukerAPIProxyMock = (server: Express) => {
  applyNotifikasjonMockMiddleware({
    app: server,
    path: "/min-ia/notifikasjon-bruker-api",
  });
};


export function applyNotifikasjonMiddleware(app) {
  const proxyConfig: Options = {
    target: 'http://notifikasjon-bruker-api.fager.svc.cluster.local',
    changeOrigin: true,
    pathRewrite: { '/min-ia/notifikasjon-bruker-api': '/api/graphql' },
    router: async (req) => {
      const tokenSet = await exchangeToken(req, NOTIFIKASJON_API_AUDIENCE);
      if (!tokenSet?.expired() && tokenSet?.access_token) {
        req.headers['authorization'] = `Bearer ${tokenSet.access_token}`;
      }
      return undefined;
    },
    secure: true,
    xfwd: true,
    logLevel: "info",
  };

  const notifikasjonBrukerApiProxy = createProxyMiddleware(
        '/min-ia/notifikasjon-bruker-api',
        proxyConfig
    );
    app.use(notifikasjonBrukerApiProxy);
}
