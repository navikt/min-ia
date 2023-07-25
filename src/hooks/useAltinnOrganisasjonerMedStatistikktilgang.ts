import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAltinnOrganisasjonerMedStatistikktilgang(): RestAltinnOrganisasjoner {
  const apiPath = `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner-med-statistikktilgang`;

  return useRestRessursSWR<AltinnOrganisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner"
  );
}
