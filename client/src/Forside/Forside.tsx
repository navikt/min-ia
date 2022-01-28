import {useAltinnOrganisasjoner} from "../hooks/useAltinnOrganisasjoner";


export const Forside = () => {

    const altinnOrganisasjoner = useAltinnOrganisasjoner();


    return (
        <p>"Welcome to Min-IA"</p>
    )
}