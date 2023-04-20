import { frontendLogger } from "./frontendLogger";
import { backendLogger } from "./backendLogger";

export const predefinerteFeilmeldinger = {
  feilVedHentingAvAltinnOrganisasjoner:
    "Feil ved kall til Altinn for henting av organisasjoner",
  brukerIkkeInloggetFeil: "Nettverkskall feilet da bruker ikke er innlogget",
  brukerIkkeAutorisertFeil: "Nettverkskall feilet da bruker ikke er Autorisert",
  ugyldigOrgnummer: "Ugyldig orgnummer benyttet",
  manglerTilgangRedirect:
    "Bruker mangler tilgang, redirectes til Min Side Arbeidsgiver",
  feilVedHentingAvAggregertStatistikk:
    "Det oppstod en feil ved kall til 'api/{orgnr}/v1/sykefravarshistorikk/aggregert'",
  feilVedHentingAvKursoversikt:
    "Det oppstod en feil ved kall til '/kursoversikt'",
}

// This logger is isomorphic, and can be imported from anywhere in the app
export const logger =
  typeof window !== "undefined" ? frontendLogger() : backendLogger();
