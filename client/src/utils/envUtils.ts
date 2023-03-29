// Only call this function on the server, as the environemnt variables are not exposed to the client.
export const isMockApp = () => {
  return (
    process.env.NAIS_CLUSTER_NAME === "localhost" ||
    process.env.NAIS_APP_NAME === "min-ia-mock"
  );
};

export type Tjeneste =
  | "Sykefraværsstatistikk"
  | "Forebyggingsplan"
  | "Samtalestøtte"
  | "Min Side Arbeidsgiver"
  | "Kontakt Oss";

export const hentUrlFraMiljøvariabel = (tjeneste: Tjeneste) => {
  let url;
  switch (tjeneste) {
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
    throw Error(
      `Fant ikke URL til ${tjeneste} i miljøvariablene. Stopper bygget.`
    );
  }
  return url;
};
