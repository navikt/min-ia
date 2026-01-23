import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import {
  API_BASE_PATH_V2,
  SYKEFRAVARSSTATISTIKK_BASE_PATH,
} from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestRessurs } from "../integrasjoner/rest-status";
import { useApiPath } from "./useApiPath";

export function useAltinnOrganisasjoner(): RestRessurs<AltinnOrganisasjon[]> {
  const apiPath = useApiPath(
    `${API_BASE_PATH_V2}/organisasjoner`,
    `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner`,
  );

  return useRestRessursSWR<AltinnOrganisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner",
  );
}

export function useAltinnOrganisasjonerMedStatistikktilgang(): RestAltinnOrganisasjoner {
  const apiPath = useApiPath(
    `${API_BASE_PATH_V2}/organisasjoner-med-statistikktilgang`,
    `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner-med-statistikktilgang`,
  );

  return useRestRessursSWR<AltinnOrganisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner",
  );
}
