import { AUTHENTICATED_BASE_PATH } from "../utils/konstanter";
import { useRestRessursSWR } from "./useRestRessursSWR";
import { RestRessurs } from "../integrasjoner/rest-status";
import { Organisasjon } from "@navikt/virksomhetsvelger";

export function useOrganisasjoner(): RestRessurs<Organisasjon[]> {
  const apiPath = `${AUTHENTICATED_BASE_PATH}/organisasjoner`

  return useRestRessursSWR<Organisasjon[]>(
    apiPath,
    "Feil ved kall til Altinn for henting av organisasjoner",
  );
}
