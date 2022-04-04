export enum Miljø {
  Lokal = "local",
  Dev = "dev-gcp",
  Labs = "labs-gcp",
  Prod = "prod-gcp",
}

export const getMiljø = (): Miljø => {
  if (typeof window === "undefined") {
    return Miljø.Lokal;
  }
  const hostname = window.location.hostname;
  if (hostname === "arbeidsgiver.nav.no") {
    return Miljø.Prod;
  }
  if (hostname === "min-ia.dev.nav.no") {
    return Miljø.Dev;
  }
  if (hostname === "arbeidsgiver.labs.nais.io") {
    return Miljø.Labs;
  }
  return Miljø.Lokal;
};
