import "./App.css";
import { Innloggingsside } from "./Innlogginsside/Innloggingsside";
import { useAltinnOrganisasjoner } from "./hooks/useAltinnOrganisasjoner";
import { Forside } from "./Forside/Forside";
import { RestStatus } from "./api/rest-status";

function App() {
  // Henter Altinn organisasjoner
  //  -> hvis 403: vis Innloggingside
  //  -> hvis OK: vis Forside

  const restAltinnOrganisasjoner = useAltinnOrganisasjoner();

  let innhold;
  if (restAltinnOrganisasjoner.status === RestStatus.Suksess) {
    innhold = <Forside />;
  } else {
    innhold = <Innloggingsside redirectUrl={window.location.href} />;
  }
  return <div className="App">{innhold}</div>;
}

export default App;
