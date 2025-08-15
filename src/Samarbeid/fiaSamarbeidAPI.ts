import { useOrgnr } from "../hooks/useOrgnr";
import { useRestRessursSWR } from "../hooks/useRestRessursSWR";
import { AUTHENTICATED_BASE_PATH } from "../utils/konstanter";
import { SamarbeidStatus } from "./Samarbeidsvelger/samarbeidtyper";

export interface FiaSamarbeidDto {
  id: string;
  saksnummer: string;
  navn: string;
  status: SamarbeidStatus;
  opprettet: Date;
  sistEndret: Date;
}

export function useFiaSamarbeid() {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${AUTHENTICATED_BASE_PATH}/fia-samarbeid?orgnr=${gyldigOrgnr}`
    : null;

  return useRestRessursSWR<FiaSamarbeidDto[]>(
    apiPath,
    `Det oppstod en feil ved kall til ${apiPath}`
  );
}
