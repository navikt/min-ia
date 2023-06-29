import { RestRessurs } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { SYKEFRAVARSSTATISTIKK_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAggregertStatistikk(): RestRessurs<AggregertStatistikkDto> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${SYKEFRAVARSSTATISTIKK_BASE_PATH}/aggregert?orgnr=${gyldigOrgnr}`
    : null;

  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk;

  return useRestRessursSWR<AggregertStatistikkDto>(apiPath, errorMessage);
}
