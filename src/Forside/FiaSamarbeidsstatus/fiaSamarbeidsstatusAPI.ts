import { RestRessurs } from "../../integrasjoner/rest-status";
import { useOrgnr } from "../../hooks/useOrgnr";
import { useRestRessursSWR } from "../../hooks/useRestRessursSWR";
import { AUTHENTICATED_BASE_PATH } from "../../utils/konstanter";

export interface FiaSamarbeidsstatusDto {
  orgnr: string;
  samarbeid: FiaSamarbeidsstatus;
}

export type FiaSamarbeidsstatus = "IKKE_I_SAMARBEID" | "I_SAMARBEID";

export function useFiaSamarbeidsstatus(): RestRessurs<FiaSamarbeidsstatusDto> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${AUTHENTICATED_BASE_PATH}/fia-samarbeidsstatus?orgnr=${gyldigOrgnr}`
    : null;

  return useRestRessursSWR<FiaSamarbeidsstatusDto>(
    apiPath,
    "Det oppstod en feil ved kall til 'api/{orgnr}/v1/sykefravarshistorikk/aggregert'"
  );
}
