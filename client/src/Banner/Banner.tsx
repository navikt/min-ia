import React, {useState} from "react";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import {createBrowserHistory, createMemoryHistory, History} from "history";
import LocationState = History.LocationState;
import { sendBedriftValgtEvent } from "../amplitude/events";

interface Props {
  tittelMedUnderTittel: string | JSX.Element;
  restOrganisasjoner: RestAltinnOrganisasjoner;
}

const getHistory = () => {
    if (typeof window === "undefined") return createMemoryHistory();
    return createBrowserHistory();
}

const Banner: React.FunctionComponent<Props> = (
  props
) => {
  const { tittelMedUnderTittel, restOrganisasjoner } = props;
  const altinnOrganisasjoner: AltinnOrganisasjon[] =
    restOrganisasjoner.status === RestStatus.Suksess
      ? restOrganisasjoner.data
      : [];


    const [history] = useState<History<LocationState>>(getHistory())

    return (
    <div>
      <Bedriftsmeny
        organisasjoner={altinnOrganisasjoner}
        sidetittel={tittelMedUnderTittel}
        history={history}
        onOrganisasjonChange={() => {
          sendBedriftValgtEvent();
        }}
      />
    </div>
  );
};

export default Banner;
