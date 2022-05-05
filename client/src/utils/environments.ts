import { Miljø } from "./miljøUtils";

export enum Applikasjon {
  Sykefraværsstatistikk,
  Kalkulator,
  Samtalestøtte,
  Nettkurs,
}

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

const getIaTjenestemetrikkerUrl = () => {
  switch (window.location.hostname) {
    case "localhost":
      return "http://localhost:8080/ia-tjenester-metrikker";
    case "arbeidsgiver.nav.no":
      return "https://arbeidsgiver.nav.no/ia-tjenester-metrikker";
    default:
      return "https://ia-tjenester-metrikker.dev.intern.nav.no";
  }
};

export const iaTjenesterMetrikkerAPI = `${getIaTjenestemetrikkerUrl()}/innlogget/mottatt-iatjeneste`;

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
      return getUrlForKalkulator(miljø);
    case Applikasjon.Nettkurs:
      return getUrlForNettkurs(miljø);
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

const getUrlForKalkulator = (miljø: Miljø): string => {
  switch (miljø) {
    case Miljø.Lokal:
      return "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk/kalkulator";
    case Miljø.Labs:
      return "https://arbeidsgiver.labs.nais.io/sykefravarsstatistikk/kalkulator";
    case Miljø.Dev:
      return "https://arbeidsgiver-gcp.dev.nav.no/sykefravarsstatistikk/redirect-til-login?redirect=https://arbeidsgiver-gcp.dev.nav.no/sykefravarsstatistikk/kalkulator";
    case Miljø.Prod:
      return "https://arbeidsgiver.nav.no/sykefravarsstatistikk/redirect-til-login?redirect=https://arbeidsgiver.nav.no/sykefravarsstatistikk/kalkulator";
    default:
      return "";
  }
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

const getUrlForNettkurs = (miljø: Miljø): string => {
  switch (miljø) {
    case Miljø.Lokal:
      return "https://arbeidsgiver.nav.no/forebygge-sykefravaer/#webinar-og-kurs";
    case Miljø.Labs:
      return "https://arbeidsgiver.nav.no/forebygge-sykefravaer/#webinar-og-kurs";
    case Miljø.Dev:
      return "https://arbeidsgiver-gcp.dev.nav.no/forebygge-sykefravaer/#webinar-og-kurs";
    case Miljø.Prod:
      return "https://arbeidsgiver.nav.no/forebygge-sykefravaer/#webinar-og-kurs";
    default:
      return "";
  }
};
