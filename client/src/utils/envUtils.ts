// Only call this function on the server, as the environemnt variables are not exposed to the client.
import { logger, predefinerteFeilmeldinger } from "./logger";

export const isProd = (): boolean => {
  return (
    process.env.NAIS_CLUSTER_NAME === "prod-gcp" ||
    process.env.ENVIRONMENT === "prod"
  );
};

export type Tjeneste =
  | "Sykefraværsstatistikk"
  | "Forebyggingsplan"
  | "Samtalestøtte"
  | "Min Side Arbeidsgiver"
  | "Kontakt Oss";

export const hentUrlFraMiljøvariabler = (tilTjeneste: Tjeneste) => {
  var url;
  switch (tilTjeneste) {
    case "Sykefraværsstatistikk":
      url = process.env.SYKEFRAVARSSTATISTIKK_URL;
      break;
    case "Samtalestøtte":
      url = process.env.SAMTALESTOTTE_URL;
      break;
    case "Min Side Arbeidsgiver":
      url = process.env.MIN_SIDE_ARBEIDSGIVER_URL;
      break;
    case "Kontakt Oss":
      url = process.env.KONTAKT_OSS_ARBEIDSGIVER_URL;
      break;
    case "Forebyggingsplan":
      url = process.env.FOREBYGGINGSPLAN_URL;
      break;
  }
  if (!url) {
    logger.error(predefinerteFeilmeldinger.fantIkkeUrlIMiljøvariabler);
  }
  return url || "";
};
