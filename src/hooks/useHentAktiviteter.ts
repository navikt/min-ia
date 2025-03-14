import { useRestRessursSWR } from "./useRestRessursSWR";
import {API_BASE_PATH} from "../utils/konstanter";

export type StatusType = "AVBRUTT" | "STARTET" | "FULLFØRT";
type AktivitetType = "OPPGAVE" | "AKTIVITETSKORT";
export type AktivitetBrukerStatus = {
  aktivitetId: string;
  aktivitetType?: AktivitetType;
  status?: StatusType;
};

export const useHentAktiviteter = (orgnr: string | null | undefined) => {
  const apiPath = `${API_BASE_PATH}/aktiviteter/orgnr/${orgnr}`;

  return useRestRessursSWR<AktivitetBrukerStatus[]>(
      apiPath,
    "Det oppstod en feil ved henting av aktiviteter"
  );
};
