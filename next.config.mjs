/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";
import cspPkg from "./src/csp.js"

const { cspString } = cspPkg
const __filename = fileURLToPath(import.meta.url);

export default {
  reactStrictMode: true,
  basePath: "/forebygge-fravar",
  output: "standalone",
  i18n: {
    locales: ["no"],
    defaultLocale: "no",
  },
  sassOptions: {
    includePaths: [path.dirname(__filename)],
  },
  async headers() {
    return [
      {
        // Applies these headers to all routes in your application.
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Xss-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Content-Security-Policy",
            value: cspString,
          },
        ],
      },
    ];
  },
};
