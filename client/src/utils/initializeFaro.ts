import {
  faro,
  initializeFaro,
  getWebInstrumentations,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export function doInitializeFaro(grafanaAgentUrl: string) {
  if (Object.keys(faro).length === 0 && grafanaAgentUrl?.length > 0) {
    console.log("Initializing Faro");
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
  } else {
    console.log("Faro already initialized");
  }
}
