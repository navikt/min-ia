import { useAltinnOrganisasjoner } from "../hooks/useAltinnOrganisasjoner";
import { RestStatus } from "../api/rest-status";
import { sendSidevisningEvent } from "../amplitude/events";
import styles from "./forside.module.scss";
import Banner from "../Banner/Banner";
import { Innloggingsside } from "../Innlogginsside/Innloggingsside";
import { Route } from "react-router";

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
      <Route>
        <div className="App">
          Here's the banner
          <Banner
            tittel={"Forebygge sykefravær"}
            restOrganisasjoner={restAltinnOrganisasjoner}
          />
          {innhold}
        </div>
      </Route>
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
