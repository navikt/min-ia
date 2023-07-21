/** @type {import('next').NextConfig} */
import path from "path";
import csp from "./src/csp.js";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

export default {
    reactStrictMode: true,
    basePath: "/forebygge-fravar",
    swcMinify: true,
    output: "standalone",
    i18n: {
        locales: ["no"],
        defaultLocale: "no",
    },
    sassOptions: {
        includePaths: [path.dirname(__filename)],
    },
    async redirects() {
        return [
            {
                source: "/nettkurs",
                destination: "/video-og-kurs",
                permanent: true,
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
