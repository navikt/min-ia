import "./App.css";
import {FunctionComponent} from "react";
import {Innloggingsside} from "./Innlogginsside/Innloggingsside";
import {useAltinnOrganisasjoner} from "./hooks/useAltinnOrganisasjoner";
import {Forside} from "./Forside/Forside";
import {RestStatus} from "./api/rest-status";
import Banner from "./Banner/Banner";
import {AmplitudeClient} from "./amplitude/client";
import {useAmplitude} from "./amplitude/useAmplitude";
import {sendSidevisningEvent} from "./amplitude/events";

interface Props {
    amplitudeClient: AmplitudeClient
}

export const App: FunctionComponent<Props> = ({amplitudeClient}) => {
    // Henter Altinn organisasjoner
    //  -> hvis 403: vis Innloggingside
    //  -> hvis OK: vis Forside

    useAmplitude(amplitudeClient)
    sendSidevisningEvent()

    const restAltinnOrganisasjoner = useAltinnOrganisasjoner();

    let innhold;
    if (restAltinnOrganisasjoner.status === RestStatus.Suksess) {
        innhold = <Forside/>;
    } else {
        innhold = <Innloggingsside redirectUrl={window.location.href}/>;
    }
    return <div className="App">
        {/*<Banner tittel={"min-ia"} restOrganisasjoner={restAltinnOrganisasjoner}/>*/}

        {innhold}
    </div>;
}

export default App;
