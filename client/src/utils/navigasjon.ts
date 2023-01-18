import { Miljø } from "./miljøUtils";

export enum Applikasjon {
  Sykefraværsstatistikk,
  Kalkulator,
  Samtalestøtte,
  Nettkurs,
}

// Sender brukeren til navigering først etter at callbacks har blitt utført. Hvis kallene
// tar lengre tid enn maksVentetid millisekunder, så tvinges navigeringen gjennom.
// NB: For at dette skal fungere så kreves det en onClickCapture med preventDefault() på lenka
export const navigerEtterCallbacks = async (
  destinasjon: string,
  callbacks: (() => Promise<boolean>)[],
  maksVentetid: number = 1000
) => {
  setTimeout(() => {
    window.location.href = destinasjon;
  }, maksVentetid);

  const results = callbacks.map((fun) => fun());

  await Promise.allSettled(results).then(
    () => (window.location.href = destinasjon)
  );
};

export const utledUrlForBedrift = (
  baseUrl: string | undefined,
  orgnr: string | undefined
): string => {
  if (!baseUrl) {
    return "#";
  }

  if (!orgnr) {
    return baseUrl;
  }
  return `${baseUrl}?bedrift=${orgnr}`;
};

export const getUrlForApplikasjon = (
  applikasjon: Applikasjon,
  miljø: Miljø
): string => {
  switch (applikasjon) {
    case Applikasjon.Samtalestøtte:
      return getUrlForSamtalestøtte(miljø);
    case Applikasjon.Sykefraværsstatistikk:
      return getUrlForSykefraværsstatistikk(miljø);
    case Applikasjon.Kalkulator:
      return getUrlForKalkulator();
    case Applikasjon.Nettkurs:
      return getUrlForNettkurs();
    default:
      return "";
  }
};

const getUrlForSykefraværsstatistikk = (miljø: Miljø): string => {
  switch (miljø) {
    case Miljø.Lokal:
      return "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk";
    case Miljø.Labs:
      return "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk";
    case Miljø.Dev:
      return "https://arbeidsgiver-gcp.dev.nav.no/sykefravarsstatistikk/redirect-til-login?redirect=https://arbeidsgiver-gcp.dev.nav.no/sykefravarsstatistikk";
    case Miljø.Prod:
      return "https://arbeidsgiver.nav.no/sykefravarsstatistikk/redirect-til-login?redirect=https://arbeidsgiver.nav.no/sykefravarsstatistikk";
    default:
      return "";
  }
};

export const getUrlForKalkulator = (): string => {
  return "/forebygge-fravar/kalkulator";
};

const getUrlForSamtalestøtte = (miljø: Miljø): string => {
  switch (miljø) {
    case Miljø.Lokal:
      return "https://arbeidsgiver.labs.nais.io/samtalestotte";
    case Miljø.Labs:
      return "https://arbeidsgiver.labs.nais.io/samtalestotte";
    case Miljø.Dev:
      return "https://arbeidsgiver-gcp.dev.nav.no/samtalestotte";
    case Miljø.Prod:
      return "https://arbeidsgiver.nav.no/samtalestotte";
    default:
      return "";
  }
};

const getUrlForNettkurs = (): string => {
  return "/forebygge-fravar/video-og-kurs";
};
