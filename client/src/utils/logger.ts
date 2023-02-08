import { frontendLogger } from "./frontendLogger";
import { backendLogger } from "./backendLogger";

export const predefinerteFeilmeldinger = {
  feilVedHentingAvAltinnOrganisasjoner: "Feil ved kall til Altinn for henting av organisasjoner",
  brukerIkkeInloggetFeil: "Nettverkskall feilet da bruker ikke er innlogget",
  brukerIkkeAutorisertFeil: "Nettverkskall feilet da bruker ikke er Autorisert",
  feilVedNettverkskall: "Det er oppstått en feil ved nettverkskall",
  ugyldigOrgnummer: "Ugyldig orgnummer benyttet",
  manglerTilgangRedirect: "Bruker mangler tilgang, redirectes til Min Side Arbeidsgiver",
}

// This logger is isomorphic, and can be imported from anywhere in the app
export const logger = typeof window !== 'undefined' ? frontendLogger() : backendLogger();
