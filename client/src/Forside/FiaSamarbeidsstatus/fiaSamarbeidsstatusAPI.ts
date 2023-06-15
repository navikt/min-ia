import { RestRessurs, RestStatus } from "../../integrasjoner/rest-status";
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

const utleddFiaSamarbeidsstatusMock = (orgnr: string): RestRessurs<FiaSamarbeidsstatusDto> => {
    return orgnr?.startsWith("9") ?
        {
            status: RestStatus.Suksess,
            data: {
                orgnr: orgnr,
                samarbeid: "I_SAMARBEID"
            }
        } :
        {
            status: RestStatus.Feil,
        }
}

export function useFiaSamarbeidsstatus(
    orgnr: string | null,
    fiaArbeidsgiverUrl: string,
    kjørerMockApp: boolean,
): RestRessurs<FiaSamarbeidsstatusDto> {
    const gyldigOrgnr = useOrgnr();

    if (kjørerMockApp && gyldigOrgnr) {
        return utleddFiaSamarbeidsstatusMock(gyldigOrgnr);
    }

    const apiPath = gyldigOrgnr
        ? `${fiaArbeidsgiverUrl}/status/${gyldigOrgnr}`
        : null;

    const errorMessage =
        predefinerteFeilmeldinger.feilVedHentingAvAggregertStatistikk;

    return useRestRessursSWR<FiaSamarbeidsstatusDto>(apiPath, errorMessage);
}
