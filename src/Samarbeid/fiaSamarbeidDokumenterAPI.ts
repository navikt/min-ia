import { useOrgnr } from "../hooks/useOrgnr";
import { useRestRessursSWR } from "../hooks/useRestRessursSWR";
import { RestRessurs, RestStatus } from "../integrasjoner/rest-status";
import { PlanType } from "../komponenter/Plan/typer";
import { Spørreundersøkelse } from "../komponenter/Spørreundersøkelsesresultat/SpørreundersøkelseRad";
import { AUTHENTICATED_BASE_PATH } from "../utils/konstanter";

export type FiaDokumentFraServer = {
  dokumentId: string;
  type: "BEHOVSVURDERING";
  dato: Date;
  innhold: string;
};
export type FiaDokument = {
  dokumentId: string;
  type: "BEHOVSVURDERING";
  dato: Date;
  innhold: Spørreundersøkelse;
} | {
  dokumentId: string;
  type: "SAMARBEIDSPLAN";
  dato: Date;
  innhold: PlanType;
};

export function useFiaDokument({dokumentId}: {dokumentId: string}): RestRessurs<FiaDokument> {
  const gyldigOrgnr = useOrgnr();

  const apiPath = gyldigOrgnr
    ? `${AUTHENTICATED_BASE_PATH}/fia-dokument?orgnr=${gyldigOrgnr}&dokumentId=${dokumentId}`
    : null;

  const res = useRestRessursSWR<FiaDokumentFraServer>(
    apiPath,
    `Det oppstod en feil ved kall til ${apiPath}`
  );

  if (res.status === RestStatus.Suksess && res.data.innhold) {
    return {
      ...res,
      data: {
        ...res.data,
        innhold: JSON.parse(res.data.innhold)
      }
    }
  }

  return res as RestRessurs<FiaDokument>;
}
