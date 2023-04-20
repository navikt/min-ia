import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { API_BASE_PATH } from "../utils/konstanter";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAltinnOrganisasjonerMedStatistikktilgang(): RestAltinnOrganisasjoner {
  const apiPath = `${API_BASE_PATH}/organisasjoner/statistikk`;
  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAltinnOrganisasjoner;

  return useRestRessursSWR<AltinnOrganisasjon[]>(apiPath, errorMessage);
}
