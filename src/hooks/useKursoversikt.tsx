import { API_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import {
  erSuksess,
  RestRessurs,
  RestStatus,
} from "../integrasjoner/rest-status";
import { Kurs, KursDto, mapTilKurs } from "../utils/kurs-api";

export function useKursoversikt(): RestRessurs<Kurs[]> {
  const apiPath = `${API_BASE_PATH}/kursoversikt`;

  const result = useRestRessursSWR<KursDto[]>(
    apiPath,
    "Det oppstod en feil ved kall til '/kursoversikt'"
  );

  if (erSuksess(result)) {
    return {
      status: RestStatus.Suksess,
      data: result.data.map((dto) => mapTilKurs(dto)),
    };
  } else {
    return result;
  }
}
