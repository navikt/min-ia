import React, { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import "@navikt/ds-css";
import styles from "./Banner.module.scss";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { sendBedriftValgtEvent } from "../amplitude/events";
import { useRouter } from "next/router";
import { ForebyggeSykefravaer } from "@navikt/bedriftsmeny";
import { NotifikasjonWidget } from "@navikt/arbeidsgiver-notifikasjon-widget";

const Bedriftsmeny = dynamic(() => import("@navikt/bedriftsmeny"), {
  ssr: false,
});

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

const Banner: React.FunctionComponent<Props> = ({
  altinnOrganisasjoner,
  tittelMedUnderTittel,
}) => {
  const { query, push } = useRouter();
  const [bedriftValgtManueltFraLista, setBedriftValgtManueltFraLista] =
    useState(false);

  const useOrgnrHook: () => [string | null, (orgnr: string) => void] =
    useCallback(() => {
      const currentOrgnr =
        typeof query.bedrift === "string" ? query.bedrift : null;

      return [
        currentOrgnr,
        (orgnr: string) => {
          if (currentOrgnr !== orgnr) {
            if (orgnr === null) {
              push("");
            } else {
              push(`?bedrift=${orgnr}`);
            }
          }
        },
      ];
    }, [push, query.bedrift]);

  const onOrganisasjonChange = () => {
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
        onOrganisasjonChange={onOrganisasjonChange}
        piktogram={<ForebyggeSykefravaer />}
        orgnrSearchParam={useOrgnrHook}
      >
        <NotifikasjonWidget />
      </Bedriftsmeny>
    </div>
  );
};

export default Banner;
