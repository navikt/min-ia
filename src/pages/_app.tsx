import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { OrgnrProvider } from "../utils/OrgnrContext";

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <OrgnrProvider>
            <Component {...pageProps} />
        </OrgnrProvider>
    );
}
