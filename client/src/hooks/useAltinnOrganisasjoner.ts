import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestRessurs } from "../integrasjoner/rest-status";

export function useAltinnOrganisasjoner(): RestRessurs<AltinnOrganisasjon[]> {
  const apiPath = `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/organisasjoner`;
  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAltinnOrganisasjoner;

  return useRestRessursSWR<AltinnOrganisasjon[]>(apiPath, errorMessage);
}
