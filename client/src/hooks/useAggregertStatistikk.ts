import { RestRessurs } from "../integrasjoner/rest-status";
import { AggregertStatistikkDto } from "../integrasjoner/aggregert-statistikk-api";
import { useOrgnr } from "./useOrgnr";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { API_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";

export function useAggregertStatistikk(): RestRessurs<AggregertStatistikkDto> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${API_BASE_PATH}/${gyldigOrgnr}/v1/sykefravarshistorikk/aggregert`
    : null;

  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk;

  return useRestRessursSWR<AggregertStatistikkDto>(apiPath, errorMessage);
}
