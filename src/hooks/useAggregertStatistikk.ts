import { RestRessurs } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";
import {API_BASE_PATH_V2, SYKEFRAVARSSTATISTIKK_BASE_PATH} from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import {useApiPath} from "./useApiPath";

export function useAggregertStatistikk(): RestRessurs<AggregertStatistikkDto> {
  const gyldigOrgnr = useOrgnr();

  const path = useApiPath(
      `${API_BASE_PATH_V2}/aggregert?orgnr=${gyldigOrgnr}`,
      `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/aggregert?orgnr=${gyldigOrgnr}`
  );

  const apiPath = gyldigOrgnr
      ? path
    : null;

  return useRestRessursSWR<AggregertStatistikkDto>(
    apiPath,
    "Det oppstod en feil ved kall til 'api/{orgnr}/v1/sykefravarshistorikk/aggregert'"
  );
}
