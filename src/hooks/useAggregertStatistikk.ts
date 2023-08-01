import { RestRessurs } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAggregertStatistikk(): RestRessurs<AggregertStatistikkDto> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/aggregert?orgnr=${gyldigOrgnr}`
    : null;

  return useRestRessursSWR<AggregertStatistikkDto>(
    apiPath,
    "Det oppstod en feil ved kall til 'api/{orgnr}/v1/sykefravarshistorikk/aggregert'"
  );
}
