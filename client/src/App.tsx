import "./App.css";
import {Innloggingsside} from "./Innlogginsside/Innloggingsside";
import {useAltinnOrganisasjoner} from "./hooks/useAltinnOrganisasjoner";
import {Forside} from "./Forside/Forside";
import {RestStatus} from "./api/rest-status";
import Banner from "./Banner/Banner";
import {Route} from "react-router-dom";

function App() {
    // Henter Altinn organisasjoner
    //  -> hvis 403: vis Innloggingside
    //  -> hvis OK: vis Forside

    const restAltinnOrganisasjoner = useAltinnOrganisasjoner();

    let innhold;
    if (restAltinnOrganisasjoner.status === RestStatus.Suksess) {
        innhold = <Forside/>;
    } else {
        innhold = <Innloggingsside redirectUrl={window.location.href}/>;
    }
    return <div className="App">
        {<Banner tittel={"Forebygge sykefravær"} restOrganisasjoner={restAltinnOrganisasjoner}/>}
        <Route path={'/'}>
            {innhold}
        </Route>
    </div>;
}

export default App;
