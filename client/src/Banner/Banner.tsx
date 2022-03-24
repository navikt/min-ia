import React, { useState } from "react";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import {
  AltinnOrganisasjon,
  RestAltinnOrganisasjoner,
} from "../integrasjoner/altinnorganisasjon-api";
import { RestStatus } from "../integrasjoner/rest-status";
import { createBrowserHistory, createMemoryHistory, History } from "history";
import { sendBedriftValgtEvent } from "../amplitude/events";
import { useRouter } from "next/router";
import LocationState = History.LocationState;

export interface Organisasjon {
  Name: string;
  Type: string;
  OrganizationNumber: string;
  OrganizationForm: string;
  Status: string;
  ParentOrganizationNumber: any;
}
interface Props {
  tittelMedUnderTittel: string | JSX.Element;
  restOrganisasjoner: RestAltinnOrganisasjoner;
}

const getHistory = () => {
  if (typeof window === "undefined") return createMemoryHistory();
  return createBrowserHistory();
};

const Banner: React.FunctionComponent<Props> = (props) => {
  const { tittelMedUnderTittel, restOrganisasjoner } = props;
  const altinnOrganisasjoner: AltinnOrganisasjon[] =
    restOrganisasjoner.status === RestStatus.Suksess
      ? restOrganisasjoner.data
      : [];
  const router = useRouter();

  const [history] = useState<History<LocationState>>(getHistory());
  const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
    if (organisasjon) {
      router.push(`?bedrift=${organisasjon.OrganizationNumber}`);
    }
    sendBedriftValgtEvent();
  };

  return (
    <div>
      <Bedriftsmeny
        organisasjoner={altinnOrganisasjoner}
        sidetittel={tittelMedUnderTittel}
        history={history}
        onOrganisasjonChange={onOrganisasjonChange}
      />
    </div>
  );
};

export default Banner;
