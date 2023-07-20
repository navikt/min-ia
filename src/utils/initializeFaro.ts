import {
  faro,
  initializeFaro,
  getWebInstrumentations,
} from "@grafana/faro-web-sdk";
import { TracingInstrumentation } from "@grafana/faro-web-tracing";

export function doInitializeFaro(grafanaAgentUrl: string) {
  if (Object.keys(faro).length === 0 && grafanaAgentUrl?.length > 0) {
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
  }
}
