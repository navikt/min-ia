/** @type {import('next').NextConfig} */
const path = require("path");
const csp = require("./src/csp");

const nextConfig = {
  reactStrictMode: true,
  basePath: "/min-ia",
  serverRuntimeConfig: {
    decoratorUrl: process.env.DECORATOR_URL,
    decoratorBreadcrumbThisPageUrl:
      process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL,
    decoratorEnv: process.env.DECORATOR_ENV,
  },
  env: {
    decoratorUrl: process.env.DECORATOR_URL,
    decoratorBreadcrumbThisPageUrl:
      process.env.DECORATOR_BREADCRUMB_THIS_PAGE_URL,
    decoratorEnv: process.env.DECORATOR_ENV,
  },
  i18n: {
    locales: ["no"],
    defaultLocale: "no",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [
      {
            source: "/favicon-32x32.png",
            destination: "http://localhost:3010/favicon-32x32.png"
      },
      {
            source: "/favicon-16x16.png",
            destination: "http://localhost:3010/favicon-16x16.png"
      },
      {
        source: "/qbrick/config/no-preload",
        destination: "http://localhost:3010/min-ia/qbrick/config/no-preload",
      },
      {
        source: "/internal/isAlive",
        destination: "http://localhost:3010/min-ia/internal/isAlive",
      },
      {
        source: "/internal/isReady",
        destination: "http://localhost:3010/min-ia/internal/isReady",
      },
      {
        source: "/internal/metrics",
        destination: "http://localhost:3010/min-ia/internal/metrics",
      },
      {
        source: "/api/:slug*",
        destination: "http://localhost:3010/min-ia/api/:slug*",
      },
      {
        source: "/redirect-til-login:slug*",
        destination: "http://localhost:3010/min-ia/redirect-til-login:slug*",
      },
      {
        source: "/success:slug*",
        destination: "http://localhost:3010/min-ia/success:slug*",
      },
      {
        source: "/kursoversikt/:slug*",
        destination: "http://localhost:3010/min-ia/kursoversikt/:slug*",
      },
      {
        source: "/metrikker/:slug*",
        destination: "http://localhost:3010/min-ia/metrikker/:slug*",
      },
    ];
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
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
            value: "no-referrer",
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()",
          },
          {
            key: "Content-Security-Policy",
            value: csp,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
