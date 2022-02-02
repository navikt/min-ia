import {useAltinnOrganisasjoner} from "../hooks/useAltinnOrganisasjoner";
import {RestStatus} from "../api/rest-status";


export const Forside = () => {

    const altinnOrganisasjoner = useAltinnOrganisasjoner();


    return (
        <p>Welcome to Min-IA, Du har tilgang
            til {altinnOrganisasjoner.status === RestStatus.Suksess ? altinnOrganisasjoner.data?.length : 0}organisasjoner{}</p>
    )
}
