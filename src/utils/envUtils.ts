// Only call this function on the server, as the environemnt variables are not exposed to the client.
export const isMockApp = () => {
  return (
    process.env.NAIS_APP_NAME === "min-ia-mock" ||
    process.env.NODE_ENV === "development"
  );
};

export const getGrafanaUrl = () => {
  return process.env.GRAFANA_AGENT_COLLECTOR_URL ?? "";
};

export const getProdUrl = (path?: string) => {
  const url = process.env.PROD_URL;

  if (!url || !url.length) {
    return "";
  }

  if (path) {
    return `${url}/${path}`;
  }

  return url;
};

export type Tjeneste =
  | "Sykefraværsstatistikk"
  | "Forebyggingsplan"
  | "Min Side Arbeidsgiver"
  | "Kontakt Oss";

export const hentUrlFraMiljøvariabel = (tjeneste: Tjeneste) => {
  let url;
  switch (tjeneste) {
    case "Sykefraværsstatistikk":
      url = process.env.SYKEFRAVARSSTATISTIKK_URL;
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
    throw Error(
      `URL til '${tjeneste}' ble ikke funnet i miljøvariablene. Stopper bygget.`
    );
  }
  return url;
};
