import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import { StatistikkIkon } from "../../Forside/ikoner/StatistikkIkon";
import { BodyLong } from "@navikt/ds-react";
import styles from "./Infographic.module.scss";
import { LenkeMedEventutsendelse } from "../../LenkeMedNavigereEvent/LenkeMedEventutsendelse";

export const InngangTilSykefraværsstatistikk = (props: {
  sykefravarsstatistikkUrl: string;
  useMobileVersion: boolean;
}) => {
  return (
    <Lenkeflis
      overskrift={"Se statistikk"}
      brødtekst={
        "Ved å sammenligne dere med andre og vite årsakene til fraværet, kan dere forebygge og redusere sykefravær."
      }
      href={props.sykefravarsstatistikkUrl}
      visBrødtekstPåMobil={true}
      infographicLenkleflis={true}
    />

    /*
    <BodyLong className={styles.oversiktTekst} size="medium">
      Trenger du en større oversikt?{" "}
      <LenkeMedEventutsendelse
        href={props.sykefravarsstatistikkUrl}
        lenketekst="Klikk her for å gå til statistikksiden."
      />
    </BodyLong>*/
  );
};
