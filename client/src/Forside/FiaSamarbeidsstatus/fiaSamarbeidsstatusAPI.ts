import { RestRessurs } from "../../integrasjoner/rest-status";
import { useOrgnr } from "../../hooks/useOrgnr";
import { predefinerteFeilmeldinger } from "../../utils/logger";
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
    ? `${AUTHENTICATED_BASE_PATH}/fia-samarbeidsstatus/?orgnr=${gyldigOrgnr}`
    : null;

  const errorMessage =
    predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk;

  return useRestRessursSWR<FiaSamarbeidsstatusDto>(apiPath, errorMessage);
}
