'use client';
import React, { ReactElement, /* useCallback, */ useState } from "react";
import { Organisasjon, Virksomhetsvelger } from "@navikt/virksomhetsvelger";
import "@navikt/virksomhetsvelger/dist/assets/style.css";
import "@navikt/ds-css";
import styles from "./Banner.module.scss";
import { AltinnOrganisasjon } from "../integrasjoner/altinnorganisasjon-api";
/* import { useRouter } from "next/router"; */
import { NotifikasjonWidget } from "@navikt/arbeidsgiver-notifikasjon-widget";
import '@navikt/arbeidsgiver-notifikasjon-widget/lib/esm/index.css';
import { sendBedriftValgtEvent } from "../analytics/analytics";
import { useOrgnrContext } from "../utils/OrgnrContext";

interface Props {
  tittelMedUnderTittel: string | ReactElement;
  altinnOrganisasjoner: AltinnOrganisasjon[];
}

const Banner: React.FunctionComponent<Props> = ({
  altinnOrganisasjoner,
  tittelMedUnderTittel
}) => {
  const [bedriftValgtManueltFraLista, setBedriftValgtManueltFraLista] =
    useState(false);

  const transformedOrganisasjoner: Organisasjon[] = React.useMemo(() => {
    const { harParent, harIkkeParent } = altinnOrganisasjoner.reduce((acc, org) => {
      if (org.ParentOrganizationNumber) {
        acc.harParent.push(org);
      } else {
        acc.harIkkeParent.push(org);
      }
      return acc;
    }, {
      harParent: [] as AltinnOrganisasjon[],
      harIkkeParent: [] as AltinnOrganisasjon[],
    });

    return harIkkeParent.map(org => ({
      navn: org.Name,
      orgnr: org.OrganizationNumber,
      underenheter: harParent
        .filter(parent => parent.ParentOrganizationNumber === org.OrganizationNumber)
        .map(parent => ({
          navn: parent.Name,
          orgnr: parent.OrganizationNumber,
          underenheter: [],
        })),
    }));
  }, [altinnOrganisasjoner]);
  const { setOrgnr: setOrgNr } = useOrgnrContext();

  const onOrganisasjonChange = (organisasjon: Organisasjon) => {
    if (bedriftValgtManueltFraLista) {
      sendBedriftValgtEvent();
    }
    setBedriftValgtManueltFraLista(true);
    setOrgNr(organisasjon.orgnr);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.bannertittel}>
          {tittelMedUnderTittel}
        </div>
        <div className={styles.virksomhetsvelgerWrapper}>
          <SSRSafeVirksomhetsvelger
            organisasjoner={transformedOrganisasjoner}
            onChange={onOrganisasjonChange}
          />
          <SSRSafeNotifikasjonWidget />
        </div>
      </div>
    </div>
  );
};

function SSRSafeVirksomhetsvelger(
  {
    organisasjoner,
    onChange,
    initValgtOrgnr,
  }: {
    organisasjoner: Organisasjon[];
    onChange: (organisasjon: Organisasjon) => void;
    initValgtOrgnr?: string;
  }) {
  const [kanRendres, setKanRendres] = useState(false);
  React.useEffect(() => {
    if (organisasjoner.length > 0) {
      setKanRendres(true);
    }
  }, [organisasjoner]);

  if (!kanRendres) {
    return null;
  }

  return (
    <Virksomhetsvelger
      organisasjoner={organisasjoner}
      onChange={onChange}
      initValgtOrgnr={initValgtOrgnr}
    />
  );
}

function SSRSafeNotifikasjonWidget() {
  const [kanRendres, setKanRendres] = useState(false);
  React.useEffect(() => {
    setKanRendres(true);
  }, []);

  if (!kanRendres) {
    return null;
  }

  return (
    <NotifikasjonWidget />
  );
}

export default Banner;
