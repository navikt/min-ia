import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";

export const FRONTEND_API_PATH = "/min-ia/api";
export const FRONTEND_METRIKKER_PATH = "/min-ia/metrikker";
export const FRONTEND_KURSOVERSIKT_PATH = "/min-ia/kursoversikt/api/kurs";
export const KURSOVERSIKT_API_PATH = "/kursoversikt/api/kurs";

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

// TODO: Fjern duplikat kode
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
  logLevel: "debug",
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

export const backendApiProxy = createProxyMiddleware(
  FRONTEND_API_PATH,
  backendApiProxyOptions
);

export const kursoversiktApiProxy = createProxyMiddleware(
  FRONTEND_KURSOVERSIKT_PATH,
  kursoveriktProxyOptions
);

export const metrikkerProxy = createProxyMiddleware(
  FRONTEND_METRIKKER_PATH,
  iaTjenestemetrikkerProxyOptions
);
