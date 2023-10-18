import { RestRessurs } from "../integrasjoner/rest-status";
import { API_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { SerialiserbarPubliseringsdatoer } from "../sykefravarsstatistikk/hooks/useSykefraværAppData";

export function usePubliseringsdato(): RestRessurs<SerialiserbarPubliseringsdatoer> {
  const apiPath = `${API_BASE_PATH}/sykefravarsstatistikk-api/publiseringsdato`;

  return useRestRessursSWR<SerialiserbarPubliseringsdatoer>(
    apiPath,
    "Det oppstod en feil ved kall til '/sykefravarsstatistikk-api/publiseringsdato'"
  );
}
