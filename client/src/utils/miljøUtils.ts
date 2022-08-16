import {
  DEV_HOST,
  LABS_HOST,
  MIN_SIDE_ARBEIDSGIVER_DEV,
  MIN_SIDE_ARBEIDSGIVER_LABS,
  MIN_SIDE_ARBEIDSGIVER_PROD,
  PROD_HOST
} from "./konstanter";

export enum Miljø {
  Lokal = "local",
  Dev = "dev-gcp",
  Labs = "labs-gcp",
  Prod = "prod-gcp",
}

export const getMiljø = ():Miljø => {
  if (typeof window === "undefined") {
    return Miljø.Lokal;
  }
  switch (window.location.hostname) {
    case PROD_HOST: return Miljø.Prod;
    case LABS_HOST: return Miljø.Labs;
    case DEV_HOST: return Miljø.Dev;
    default: return Miljø.Lokal;
  }
};

export const getMinSideArbeidsgiverUrl = () => {
  switch (getMiljø()) {
    case Miljø.Prod: return MIN_SIDE_ARBEIDSGIVER_PROD;
    case Miljø.Labs: return MIN_SIDE_ARBEIDSGIVER_LABS;
    case Miljø.Dev: return MIN_SIDE_ARBEIDSGIVER_DEV;
    default: return MIN_SIDE_ARBEIDSGIVER_LABS;
  }
};
