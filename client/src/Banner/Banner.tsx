import React, { useState } from "react";
import styles from "./Banner.module.scss";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { createBrowserHistory, createMemoryHistory, History } from "history";
import { sendBedriftValgtEvent } from "../amplitude/events";
import { useRouter } from "next/router";

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
  altinnOrganisasjoner: AltinnOrganisasjon[];
}

const getHistory = () => {
  if (typeof window === "undefined") return createMemoryHistory();
  return createBrowserHistory();
};

const Banner: React.FunctionComponent<Props> = (props) => {
  const { tittelMedUnderTittel, altinnOrganisasjoner } = props;
  const router = useRouter();
  const [history] = useState<History>(getHistory());

  const [bedriftValgtManueltFraLista, setBedriftValgtManueltFraLista] =
    useState(false);

  const onOrganisasjonChange = (organisasjon?: Organisasjon) => {
    if (organisasjon) {
      router.push(`?bedrift=${organisasjon.OrganizationNumber}`);
    }
    if (bedriftValgtManueltFraLista) {
      sendBedriftValgtEvent();
    }
    setBedriftValgtManueltFraLista(true);
  };

  return (
    <div className={styles.banner}>
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
