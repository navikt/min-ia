import { useEffect, useState } from "react";
import {
  hentAltinnOrganisasjoner,
  RestAltinnOrganisasjoner,
} from "../api/altinnorganisasjon-api";
import { RestStatus } from "../api/rest-status";

export function useAltinnOrganisasjoner() {
  const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
    useState<RestAltinnOrganisasjoner>({
      status: RestStatus.LasterInn,
    });

  const API_BASE_URL = "/min-ia/api";
  useEffect(() => {
    hentAltinnOrganisasjoner(`${API_BASE_URL}/organisasjoner`).then(
      setRestAltinnOrganisasjoner
    );
  }, []);
  return restAltinnOrganisasjoner;
}
