import promBundle from "express-prom-bundle";
import { basePath } from "../config/meta";

export const prometheus = promBundle({
  includePath: true,
  metricsPath: `${basePath}/internal/metrics`,
});
