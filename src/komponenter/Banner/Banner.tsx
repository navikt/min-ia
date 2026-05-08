"use client";
import React, { ReactElement, /* useCallback, */ useState } from "react";
import dynamic from "next/dynamic";
import { Organisasjon } from "@navikt/virksomhetsvelger";
import "@navikt/virksomhetsvelger/dist/assets/style.css";
import "@navikt/ds-css";
import styles from "./Banner.module.scss";
import { sendBedriftValgtEvent } from "../../utils/analytics/analytics";
import { useOrgnrContext } from "../../utils/OrgnrContext";

const VirksomhetsvelgerNoSSR = dynamic(
  () => import("@navikt/virksomhetsvelger").then((m) => m.Virksomhetsvelger),
  { ssr: false },
);

const NotifikasjonWidgetNoSSR = dynamic(
  () =>
    import("@navikt/arbeidsgiver-notifikasjon-widget").then(
      (m) => m.NotifikasjonWidget,
    ),
  { ssr: false },
);

interface Props {
  tittelMedUnderTittel: string | ReactElement;
  altinnOrganisasjoner: Organisasjon[];
}

const Banner: React.FunctionComponent<Props> = ({
  altinnOrganisasjoner,
  tittelMedUnderTittel,
}) => {
  const [bedriftValgtManueltFraLista, setBedriftValgtManueltFraLista] =
    useState(false);

  const { setOrgnr, orgnr } = useOrgnrContext();

  const onOrganisasjonChange = (organisasjon: Organisasjon) => {
    if (bedriftValgtManueltFraLista) {
      sendBedriftValgtEvent();
    }
    setBedriftValgtManueltFraLista(true);
    setOrgnr(organisasjon.orgnr);
  };

  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <div className={styles.bannertittel}>{tittelMedUnderTittel}</div>
        <div className={styles.virksomhetsvelgerWrapper}>
          {altinnOrganisasjoner.length > 0 && (
            <VirksomhetsvelgerNoSSR
              organisasjoner={altinnOrganisasjoner}
              onChange={onOrganisasjonChange}
              initValgtOrgnr={orgnr ?? undefined}
            />
          )}
          <NotifikasjonWidgetNoSSR />
        </div>
      </div>
    </div>
  );
};

export default Banner;
