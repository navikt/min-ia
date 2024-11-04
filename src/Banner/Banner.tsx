import React, { useCallback, useState } from "react";
import "@navikt/bedriftsmeny/lib/bedriftsmeny.css";
import "@navikt/ds-css";
import styles from "./Banner.module.scss";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
import { useRouter } from "next/router";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import { NotifikasjonWidget } from "@navikt/arbeidsgiver-notifikasjon-widget";
import '@navikt/arbeidsgiver-notifikasjon-widget/lib/esm/index.css';
import { sendBedriftValgtEvent } from "../amplitude/amplitude";

interface Props {
  tittelMedUnderTittel: string | JSX.Element;
  altinnOrganisasjoner: AltinnOrganisasjon[];
}

const Banner: React.FunctionComponent<Props> = ({
  altinnOrganisasjoner,
  tittelMedUnderTittel,
}) => {
  const { query, replace } = useRouter();
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
              replace("");
            } else {
              replace(`?bedrift=${orgnr}`);
            }
          }
        },
      ];
    }, [replace, query.bedrift]);

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
        orgnrSearchParam={useOrgnrHook}
      >
        <NotifikasjonWidget />
      </Bedriftsmeny>
    </div>
  );
};

export default Banner;
