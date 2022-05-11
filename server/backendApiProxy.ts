import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";
import { create } from "domain";

const envProperties = {
  BACKEND_API_BASE_URL:
    process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL || "http://localhost:8080",
  METIRKKER_API_BASE_URL:
    process.env.IA_TJENESTEMERTIKKER_BASE_URL || "http://localhost:8080", // Samme host som sfs-api, ikke helt bra kanskje
  PORT: process.env.PORT || 3010,
};

export const BASE_PATH = "/min-ia";
const FRONTEND_API_PATH = BASE_PATH + "/api";
const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";

const backendApiProxyOptions: Options = {
  target: BACKEND_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
  },
  router: async (req) => {
    if (process.env.NODE_ENV === "development") {
      // I labs så returnerer vi mock uansett
      return undefined;
    }
    const tokenSet = await exchangeToken(req);
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
    }
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

const FRONTEND_METRIKKER_PATH = BASE_PATH + "/metrikker";
const METRIKKER_PATH = "/ia-tjenester-metrikker";
const METRIKKER_BASE_URL = `${envProperties.METIRKKER_API_BASE_URL}`;

// TODO: Fjern duplikat kode
const iaTjenestemetrikkerProxyOptions: Options = {
  target: METRIKKER_BASE_URL,
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace(FRONTEND_METRIKKER_PATH, METRIKKER_PATH);
  },
  router: async (req) => {
    if (process.env.NODE_ENV === "development") {
      // I labs så returnerer vi mock uansett
      return undefined;
    }
    const tokenSet = await exchangeToken(req);
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
    }
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

export const metrikkerProxy = createProxyMiddleware(
  METRIKKER_PATH,
  iaTjenestemetrikkerProxyOptions
);

export const backendApiProxy = createProxyMiddleware(
  FRONTEND_API_PATH,
  backendApiProxyOptions
);
