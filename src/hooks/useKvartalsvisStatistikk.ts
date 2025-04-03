import { RestRessurs } from "../integrasjoner/rest-status";
import { useOrgnr } from "./useOrgnr";
import {API_BASE_PATH, API_BASE_PATH_V2} from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { KvartalsvisSykefraværshistorikk } from "../sykefravarsstatistikk/hooks/useSykefraværAppData";
import {usePath} from "./usePath";

export function useKvartalsvisStatistikk(): RestRessurs<
  KvartalsvisSykefraværshistorikk[]
> {
  const gyldigOrgnr = useOrgnr();
  const path = usePath(
      `${API_BASE_PATH_V2}/kvartalsvis?orgnr=${gyldigOrgnr}`,
      `${API_BASE_PATH}/sykefravarsstatistikk-api/kvartalsvis-sykefravarshistorikk?orgnr=${gyldigOrgnr}`
  );
  const apiPath = gyldigOrgnr
      ? path
    : null;

  return useRestRessursSWR<KvartalsvisSykefraværshistorikk[]>(
    apiPath,
    "Det oppstod en feil ved kall til '/sykefravarsstatistikk-api/${orgnr}/sykefravarshistorikk/kvartalsvis'"
  );
}
