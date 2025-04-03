import { RestRessurs } from "../integrasjoner/rest-status";
import {API_BASE_PATH, API_BASE_PATH_V2} from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { SerialiserbarPubliseringsdatoer } from "../sykefravarsstatistikk/hooks/useSykefraværAppData";
import {usePath} from "./usePath";

export function usePubliseringsdato(): RestRessurs<SerialiserbarPubliseringsdatoer> {
    const apiPath = usePath(
        `${API_BASE_PATH_V2}/publiseringsdato`,
        `${API_BASE_PATH}/sykefravarsstatistikk-api/publiseringsdato`
    );

  return useRestRessursSWR<SerialiserbarPubliseringsdatoer>(
    apiPath,
    "Det oppstod en feil ved kall til '/sykefravarsstatistikk-api/publiseringsdato'"
  );
}
