import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";

// TODO: Dette objektet kan sanns. fjernes
const envProperties = {
  BACKEND_API_BASE_URL:
    process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL || "http://localhost:8080",
  METRIKKER_API_BASE_URL:
    process.env.IA_TJENESTEMERTIKKER_BASE_URL ||
    "http://localhost:8080/ia-tjenester-metrikker", // Samme host som sfs-api, ikke helt bra kanskje
  PORT: process.env.PORT || 3010,
};

const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";

const backendApiProxyOptions: Options = {
  target: BACKEND_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace("/min-ia" + "/api", BACKEND_API_PATH);
  },
  router: async (req) => {
    console.log("[DEBUG] Proxyer kall til backend api");
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

export const FRONTEND_METRIKKER_PATH = "/min-ia" + "/metrikker";

// TODO: Fjern duplikat kode
const iaTjenestemetrikkerProxyOptions: Options = {
  target: `${envProperties.METRIKKER_API_BASE_URL}`,
  changeOrigin: true,
  pathRewrite: { FRONTEND_METRIKKER_PATH: "/" },
  router: async (req) => {
    console.log("[DEBUG] Proxyer kall til metrikker");
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
  FRONTEND_METRIKKER_PATH,
  iaTjenestemetrikkerProxyOptions
);

export const backendApiProxy = createProxyMiddleware(
  "/min-ia" + "/api",
  backendApiProxyOptions
);
