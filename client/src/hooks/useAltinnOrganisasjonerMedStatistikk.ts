import { useEffect, useState } from "react";
import {
  hentAltinnOrganisasjoner,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import { BASE_PATH } from "../utils/konstanter";

export function useAltinnOrganisasjonerMedStatistikk() {
  const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
    useState<RestAltinnOrganisasjoner>({
      status: RestStatus.LasterInn,
    });

  useEffect(() => {
    hentAltinnOrganisasjoner(`${BASE_PATH}/api/organisasjoner/statistikk`).then(
      (altinnOrganisasjoner) =>
        setRestAltinnOrganisasjoner(altinnOrganisasjoner)
    );
  }, []);
  return restAltinnOrganisasjoner;
}
