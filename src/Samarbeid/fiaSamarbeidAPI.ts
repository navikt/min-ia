import { useOrgnr } from "../hooks/useOrgnr";
import { useRestRessursSWR } from "../hooks/useRestRessursSWR";
import { AUTHENTICATED_BASE_PATH } from "../utils/konstanter";
import { SamarbeidStatus } from "./Samarbeidsvelger/samarbeidtyper";

export type KartleggingType = "BEHOVSVURDERING" | "EVALUERING";
export type DokumentType = KartleggingType | "SAMARBEIDSPLAN";
export interface FiaSamarbeidDokument {
  dokumentId: string;
  type: DokumentType;
  dato: Date;
}
export interface FiaSamarbeidDto {
  offentligId: string;
  saksnummer: string;
  navn: string;
  status: SamarbeidStatus;
  opprettet: Date;
  sistEndret: Date;
  dokumenter: FiaSamarbeidDokument[];
}

export function useFiaSamarbeid() {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${AUTHENTICATED_BASE_PATH}/fia-samarbeid?orgnr=${gyldigOrgnr}`
    : null;

  return useRestRessursSWR<FiaSamarbeidDto[]>(
    apiPath,
    `Det oppstod en feil ved kall til ${apiPath}`,
  );
}
