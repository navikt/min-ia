import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { exchangeToken } from "./tokenx";

const backendApiBaseUrl =
  process.env.SYKEFRAVARSSTATISTIKK_API_BASE_URL ?? "http://localhost:8080";
const iaTjenestemetrikkerBaseUrl = // Samme host som sfs-api, ikke helt bra kanskje
  process.env.IA_TJENESTER_METRIKKER_BASE_URL ??
  "http://localhost:8080/ia-tjenester-metrikker";

export const FRONTEND_API_PATH = "/min-ia/api";
export const FRONTEND_METRIKKER_PATH = "/min-ia/metrikker";

const backendApiProxyOptions: Options = {
  target: backendApiBaseUrl,
  changeOrigin: true,
  pathRewrite: { [FRONTEND_API_PATH]: "/sykefravarsstatistikk-api" },
  router: async (req) => {
    console.log("[DEBUG] Proxyer kall til backend api");
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
  target: iaTjenestemetrikkerBaseUrl,
  changeOrigin: true,
  pathRewrite: { [FRONTEND_METRIKKER_PATH]: "" },
  router: async (req) => {
    console.log("[DEBUG] Proxyer kall til metrikker api"); // TODO; Ta i bruk exchangeTokenAndAddHeader
    const tokenSet = await exchangeToken(
      req,
      process.env.IA_TJENESTER_METRIKKER_AUDIENCE
    );
    if (!tokenSet?.expired() && tokenSet?.access_token) {
      console.log("Setter authorization header");
      req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
    }
    console.log("Token set expired? ", tokenSet?.expired());
    console.log("Lengden på access token: ", tokenSet.access_token.length);

    console.log("Path er: ", req.path);
    console.log("Headers er ", req.headers);
    return undefined;
  },
  secure: true,
  xfwd: true,
  logLevel: "debug",
};

export const backendApiProxy = createProxyMiddleware(
  FRONTEND_API_PATH,
  backendApiProxyOptions
);

export const metrikkerProxy = createProxyMiddleware(
  FRONTEND_METRIKKER_PATH,
  iaTjenestemetrikkerProxyOptions
);

// const exchangeTokenAndAddToHeader = async (req: Request) => {
//   const tokenSet = await exchangeToken(req, );
//   if (!tokenSet?.expired() && tokenSet?.access_token) {
//     req.headers["authorization"] = `Bearer ${tokenSet.access_token}`;
//   }
// };

const getProxySettings = (
  targetHost: string,
  pathRewrite?: { from: string; to: string },
  headers?: { [header: string]: string }
): Options => {
  return {
    target: targetHost,
    pathRewrite: pathRewrite,
    headers: headers,
    changeOrigin: true,
    secure: true,
    xfwd: true,
    logLevel: "info",
  };
};
