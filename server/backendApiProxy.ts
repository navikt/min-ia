import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";

const envProperties = {
  BACKEND_API_BASE_URL:
    process.env.BACKEND_API_BASE_URL || "http://localhost:8080",
  PORT: process.env.PORT || 3010,
};

const BASE_PATH = "/min-ia";
const FRONTEND_API_PATH = BASE_PATH + "/api";
const BACKEND_API_BASE_URL = `${envProperties.BACKEND_API_BASE_URL}`;
const BACKEND_API_PATH = "/sykefravarsstatistikk-api";

const proxyOptions: Options = {
  target: BACKEND_API_BASE_URL,
  changeOrigin: true,
  pathRewrite: (path) => {
    return path.replace(FRONTEND_API_PATH, BACKEND_API_PATH);
  },
  router: async (req) => {
    if (process.env.NODE_ENV === "labs-gcp") {
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
  logLevel: "debug",
};

export const backendApiProxy = createProxyMiddleware(
  FRONTEND_API_PATH,
  proxyOptions
);
