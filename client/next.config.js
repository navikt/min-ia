/** @type {import('next').NextConfig} */
const path = require("path");
const csp = require("./src/csp");

const nextConfig = {
  reactStrictMode: true,
  basePath: "/min-ia",
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [
      {
        source: "/internal/isAlive",
        destination: "http://localhost:3010/min-ia/internal/isAlive",
      },
      {
        source: "/internal/isReady",
        destination: "http://localhost:3010/min-ia/internal/isReady",
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
