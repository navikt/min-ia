import { RestRessurs } from "../../integrasjoner/rest-status";
import { useOrgnr } from "../../hooks/useOrgnr";
import { predefinerteFeilmeldinger } from "../../utils/logger";
import { useRestRessursSWR } from "../../hooks/useRestRessursSWR";

export interface FiaSamarbeidsstatusDto {
    orgnr: string;
    samarbeid: FiaSamarbeidsstatus;
}

export type FiaSamarbeidsstatus =
    | "IKKE_I_SAMARBEID"
    | "I_SAMARBEID"

export function useFiaSamarbeidsstatus(
    orgnr: string | null,
    fiaArbeidsgiverUrl: string
): RestRessurs<FiaSamarbeidsstatusDto> {
    const gyldigOrgnr = useOrgnr();

    const apiPath = gyldigOrgnr
        ? `${fiaArbeidsgiverUrl}/status/${gyldigOrgnr}`
        : null;

    const errorMessage =
        predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk;

    return useRestRessursSWR<FiaSamarbeidsstatusDto>(apiPath, errorMessage);
}
