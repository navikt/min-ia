import promBundle from "express-prom-bundle";
import { APP_BASE_PATH } from "../meta.js";

export const prometheus = promBundle({
  includePath: true,
  metricsPath: `${APP_BASE_PATH}/internal/metrics`,
});
