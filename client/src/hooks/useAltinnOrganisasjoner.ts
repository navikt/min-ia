import { useEffect, useState } from "react";
import {
  hentAltinnOrganisasjoner,
  RestAltinnOrganisasjoner,
} from "../api/altinnorganisasjon-api";
import { RestStatus } from "../api/rest-status";
import {API_BASE_URL} from "../utils/konstanter";

export function useAltinnOrganisasjoner() {
  const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
    useState<RestAltinnOrganisasjoner>({
      status: RestStatus.LasterInn,
    });

  useEffect(() => {
    hentAltinnOrganisasjoner(`${API_BASE_URL}/organisasjoner`).then(
      setRestAltinnOrganisasjoner
    );
  }, []);
  return restAltinnOrganisasjoner;
}
