import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import {
  faro,
  initializeFaro,
  getWebInstrumentations,
  OTELApi,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

function doInitializeFaro(grafanaAgentUrl: string) {
  if (Object.keys(faro).length === 0) {
    initializeFaro({
      url: grafanaAgentUrl,
      app: {
        name: "forebygge-fravær",
        version: "dev",
      },
      instrumentations: [
        ...getWebInstrumentations(),
        new TracingInstrumentation(),
      ],
    });

    const { trace, context } = faro.api.getOTEL() as OTELApi;

    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("some business process");

    const someBusinessProcess = () => {};

    context.with(trace.setSpan(context.active(), span), () => {
      someBusinessProcess();
      span.end();
    });
  }
}

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{ kjørerMockApp: boolean; grafanaAgentUrl: string }>) {
  React.useEffect(() => {
    if (!pageProps.kjørerMockApp) {
      doInitializeFaro(pageProps.grafanaAgentUrl);
    }
  });

  return <Component {...pageProps} />;
}
