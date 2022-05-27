import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";

const envProperties = {
  BACKEND_API_BASE_URL:
    process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL || "http://localhost:8080",
  PORT: process.env.PORT || 3010,
};
const kursoversiktBaseUrl =
  "https://arbeidsgiver.nav.no";

export const BASE_PATH = "/min-ia";
const FRONTEND_API_PATH = BASE_PATH + "/api";
const FRONTEND_KURSOVERSIKT_PATH = BASE_PATH + "/kursoversikt/api/kurs";
const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";
const KURSOVERSIKT_API_PATH ="/kursoversikt/api/kurs";

const proxyOptions: Options = {
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

export const backendApiProxy = createProxyMiddleware(
  FRONTEND_API_PATH,
  proxyOptions
);

const kursoveriktProxyOptions: Options = {
  target: kursoversiktBaseUrl,
  changeOrigin: true,
      pathRewrite: { [FRONTEND_KURSOVERSIKT_PATH]: KURSOVERSIKT_API_PATH },
  router: async (req) => {
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "info",
};

export const kursoversiktApiProxy = createProxyMiddleware(
  FRONTEND_KURSOVERSIKT_PATH,
  kursoveriktProxyOptions
);
