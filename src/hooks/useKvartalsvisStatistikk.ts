import { RestRessurs } from "../integrasjoner/rest-status";
import { useOrgnr } from "./useOrgnr";
import { API_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { KvartalsvisSykefraværshistorikk } from "../sykefravarsstatistikk/hooks/useSykefraværAppData";

export function useKvartalsvisStatistikk(): RestRessurs<
  KvartalsvisSykefraværshistorikk[]
> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${API_BASE_PATH}/sykefravarsstatistikk-api/kvartalsvis-sykefravarshistorikk?orgnr=${gyldigOrgnr}`
    : null;

  return useRestRessursSWR<KvartalsvisSykefraværshistorikk[]>(
    apiPath,
    "Det oppstod en feil ved kall til '/sykefravarsstatistikk-api/${orgnr}/sykefravarshistorikk/kvartalsvis'"
  );
}
