import { useRestRessursSWR } from "./useRestRessursSWR";

export type StatusType = "AVBRUTT" | "STARTET" | "FULLFØRT";
type AktivitetType = "OPPGAVE" | "AKTIVITETSKORT";
export type AktivitetBrukerStatus = {
  aktivitetId: string;
  aktivitetType?: AktivitetType;
  status?: StatusType;
};

export const useHentAktiviteter = (orgnr: string | null | undefined) => {
  return useRestRessursSWR<AktivitetBrukerStatus[]>(
    `forebygge-fravar/api/aktiviteter/orgnr/${orgnr}`,
    "Det oppstod en feil ved henting av aktiviteter"
  );
};
