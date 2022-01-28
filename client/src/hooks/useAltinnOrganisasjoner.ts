import { useEffect, useState } from 'react';
import { hentAltinnOrganisasjoner, RestAltinnOrganisasjoner } from '../api/altinnorganisasjon-api';
import { RestStatus } from '../api/rest-status';

export function useAltinnOrganisasjoner() {
    const [restAltinnOrganisasjoner, setRestAltinnOrganisasjoner] =
        useState<RestAltinnOrganisasjoner>({
            status: RestStatus.LasterInn,
        });

    const BACKEND_API_BASE_URL = 'http://localhost:8080'

    useEffect(() => {
        hentAltinnOrganisasjoner(`${BACKEND_API_BASE_URL}/api/organisasjoner`).then(
            setRestAltinnOrganisasjoner
        );
    }, []);
    return restAltinnOrganisasjoner;
}
