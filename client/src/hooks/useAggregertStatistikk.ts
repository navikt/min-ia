import { RestRessurs, RestStatus } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";
import useSWR from "swr";
import { fetcher } from "../integrasjoner/fetcher";
import { logger, predefinerteFeilmeldinger } from "../utils/logger";
import { API_BASE_PATH } from "../utils/konstanter";

export function useAggregertStatistikk(): RestRessurs<AggregertStatistikkDto> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${API_BASE_PATH}/${gyldigOrgnr}/v1/sykefravarshistorikk/aggregert`
    : null;

  const { data, error, isLoading } = useSWR(apiPath, fetcher);

  if (error) {
    logger.error(predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk);
    return { status: RestStatus.Feil };
  }
  if (isLoading) return { status: RestStatus.LasterInn };
  if (!data) {
    return { status: RestStatus.IkkeLastet };
  }

  // TODO: Skriv tester for alle disse casene
  return data;
}
