import { BASE_PATH } from "../utils/konstanter";
import { predefinerteFeilmeldinger } from "../utils/logger";
import { useRestRessursSWR } from "./useRestRessursSWR";
import {
  erSuksess,
  RestRessurs,
  RestStatus,
} from "../integrasjoner/rest-status";
import { Kurs, KursDto, mapTilKurs } from "../utils/kurs-api";

export function useKursoversikt(): RestRessurs<Kurs[]> {
  const apiPath = `${BASE_PATH}/kursoversikt`;
  const errorMessage = predefinerteFeilmeldinger.feilVedHentingAvKursoversikt;

  const result = useRestRessursSWR<KursDto[]>(apiPath, errorMessage);

  if (erSuksess(result)) {
    return {
      status: RestStatus.Suksess,
      data: result.data.map((dto) => mapTilKurs(dto)),
    };
  } else {
    return result;
  }
}
