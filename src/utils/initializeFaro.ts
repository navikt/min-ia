import {
  faro,
  initializeFaro,
  getWebInstrumentations,
} from "@grafana/faro-web-sdk";

export function doInitializeFaro(
  grafanaAgentUrl: string,
  name = "forebygge-fravær"
) {
  if (Object.keys(faro).length === 0 && grafanaAgentUrl?.length > 0) {
    initializeFaro({
      url: grafanaAgentUrl,
      app: {
        name,
        version: "dev",
      },
      instrumentations: [...getWebInstrumentations()],
    });
  }
}
