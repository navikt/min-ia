import React from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import '@navikt/bedriftsmeny/lib/bedriftsmeny.css';
import {AltinnOrganisasjon, RestAltinnOrganisasjoner} from '../api/altinnorganisasjon-api';
//import {sendBedriftValgtEvent} from '../amplitude/events';
import {RestStatus} from "../api/rest-status";
import {RouteComponentProps, withRouter} from 'react-router-dom';

interface Props {
    tittel: string;
    restOrganisasjoner: RestAltinnOrganisasjoner;
}

const Banner: React.FunctionComponent<Props & RouteComponentProps> = (props) => {
    const { history, tittel, restOrganisasjoner } = props;
    let altinnOrganisasjoner: AltinnOrganisasjon[] =
        restOrganisasjoner.status === RestStatus.Suksess ? restOrganisasjoner.data : [];
    return (
        <Bedriftsmeny
            organisasjoner={altinnOrganisasjoner}
            sidetittel={tittel}
            history={history}
            onOrganisasjonChange={()=>{}}
        />
    );
};

export default withRouter(Banner);
