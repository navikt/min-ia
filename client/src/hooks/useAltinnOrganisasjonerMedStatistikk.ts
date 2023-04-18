import {
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import { API_BASE_PATH } from "../utils/konstanter";
import { fetcher } from "../integrasjoner/fetcher";
import { logger, predefinerteFeilmeldinger } from "../utils/logger";
import useSWR from "swr";

export function useAltinnOrganisasjonerMedStatistikk(): RestAltinnOrganisasjoner {
  const { data, error, isLoading } = useSWR(
    `${API_BASE_PATH}/organisasjoner/statistikk`,
    fetcher
  );

  if (error) {
    logger.error(
      predefinerteFeilmeldinger.feilVedHentingAvAltinnOrganisasjoner
    );
    return { status: RestStatus.Feil };
  }
  if (isLoading) return { status: RestStatus.LasterInn };
  if (!data) {
    return { status: RestStatus.IkkeLastet };
  }

  // TODO: Skriv tester for alle disse casene
  return data;
}
