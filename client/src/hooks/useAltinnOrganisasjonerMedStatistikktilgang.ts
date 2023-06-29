import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAltinnOrganisasjonerMedStatistikktilgang(): RestAltinnOrganisasjoner {
  const apiPath = `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner-med-statistikk`;
  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAltinnOrganisasjoner;

  return useRestRessursSWR<AltinnOrganisasjon[]>(apiPath, errorMessage);
}
