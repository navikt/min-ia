import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../api/rest-status";
import { sendSidevisningEvent } from "../amplitude/events";
import styles from "./forside.module.scss";
import Banner from "../Banner/Banner";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import {Route, Switch} from "react-router";

export const Forside = () => {
  const altinnOrganisasjoner = useAltinnOrganisasjoner();
  //sendSidevisningEvent()

  const restAltinnOrganisasjoner = useAltinnOrganisasjoner();

  let innhold;
  if (restAltinnOrganisasjoner.status === RestStatus.Suksess) {
    innhold = <Forside />;
  } else {
    innhold = (
      <Innloggingsside
        redirectUrl={typeof window !== "undefined" ? window.location.href : ""}
      />
    );
  }
  return (
    <>
     <Switch> <Route><Banner
          tittel={"Forebygge sykefravær"}
          restOrganisasjoner={restAltinnOrganisasjoner}
      /></Route>
      <Route>
        <div className="App">
          Heres the banner
          {innhold}
        </div>
      </Route>
     </Switch>
    </>
  );

  /*
      return (
        <div className={styles.forside}>
            <Banner
                tittel={"Forebygge sykefravær"}
                restOrganisasjoner={restAltinnOrganisasjoner}
            />
            <p>
            Welcome to Min-IA, Du har tilgang til{" "}
            {altinnOrganisasjoner.status === RestStatus.Suksess
              ? altinnOrganisasjoner.data?.length
              : 0}
            organisasjoner{}
          </p>
        </div>
      );*/
};
