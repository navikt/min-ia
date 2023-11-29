import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestRessurs } from "../integrasjoner/rest-status";

export function useAltinnOrganisasjoner(): RestRessurs<AltinnOrganisasjon[]> {
  const apiPath = `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner`;

  return useRestRessursSWR<AltinnOrganisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner",
  );
}

export function useAltinnOrganisasjonerMedStatistikktilgang(): RestAltinnOrganisasjoner {
  const apiPath = `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner-med-statistikktilgang`;

  return useRestRessursSWR<AltinnOrganisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner",
  );
}