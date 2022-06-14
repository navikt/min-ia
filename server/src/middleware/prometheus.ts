import promBundle from "express-prom-bundle";
import { APP_BASE_PATH } from "../config/meta";

export const prometheus = promBundle({
  includePath: true,
  metricsPath: `${APP_BASE_PATH}/internal/metrics`,
});
