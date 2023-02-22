import { Lenkeflis } from "../../Lenkeflis/Lenkeflis";
import styles from "./InngangTilSykefraværsstatistikk.module.scss";
import React from "react";

export const InngangTilSykefraværsstatistikk = (props: {
  sykefravarsstatistikkUrl: string;
  useMobileVersion: boolean;
  brukerHarIaRettighetTilValgtBedrift: boolean;
}) => {
  let inngang;
  if (props.brukerHarIaRettighetTilValgtBedrift) {
    inngang = (
      <div className={styles.sykefraværsstatistikkLenkeflisBoks}>
        <Lenkeflis
          overskrift={"Se statistikk"}
          brødtekst={
            "Ved å sammenligne dere med andre og vite årsakene til fraværet, kan dere forebygge og redusere sykefravær."
          }
          href={props.sykefravarsstatistikkUrl}
          visBrødtekstPåMobil={true}
          infographicLenkeflis={true}
        />
      </div>
    );
  } else {
    inngang = (
      <div className={styles.sykefraværsstatistikkLenkeflisBoks}>
        <Lenkeflis
          overskrift={"Be om tilgang"}
          brødtekst={
            "Klikk her for å be om tilgang for å se denne virksomhetens sykefraværsstatistikk."
          }
          href={props.sykefravarsstatistikkUrl}
          visBrødtekstPåMobil={true}
          infographicLenkeflis={true}
        />
      </div>
    );
  }

  return inngang;
};
