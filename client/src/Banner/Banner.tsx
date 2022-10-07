import React, { useState } from "react";
import dynamic from 'next/dynamic';
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import styles from './Banner.module.scss'
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { sendBedriftValgtEvent } from "../amplitude/events";
import { useRouter } from "next/router";
import { MemoryRouter } from "react-router-dom";

const Bedriftsmeny = dynamic(() => import("@navikt/bedriftsmeny"), {
  ssr: false,
})

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

const Banner: React.FunctionComponent<Props> = (props) => {
  const { tittelMedUnderTittel, altinnOrganisasjoner } = props;
  const router = useRouter();

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
      <MemoryRouter>
        <Bedriftsmeny
          organisasjoner={altinnOrganisasjoner}
          sidetittel={tittelMedUnderTittel}
          onOrganisasjonChange={onOrganisasjonChange}
        />
      </MemoryRouter>
    </div>
  );
};

export default Banner;
