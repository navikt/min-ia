import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./Kalkulator.module.scss";
import Kostnad from "./../Kostnad/Kostnad";
import {
  getKostnadForAntallDagsverk,
  GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR,
  Kalkulatorvariant,
  validerDesimaltallOgReturnerMatch,
} from "../kalkulator-utils";
import { Kalkulatorrad } from "./Kalkulatorrad/Kalkulatorrad";
import { ExternalLink } from "@navikt/ds-icons";

export interface Props {
  tapteDagsverkFraDb?: string;
  nedlastingPågår: boolean;
}

export const KalkulatorMedDagsverk: FunctionComponent<Props> = ({
  tapteDagsverkFraDb,
  nedlastingPågår,
}) => {
  const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<
    string | undefined
  >();

  const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<
    string | undefined
  >();

  const [manglerData, setManglerData] = useState<boolean | undefined>();
  const [kostnadDagsverk, setKostnadDagsverk] = useState<string | undefined>(
    GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR
  );
  // TODO OBS: Fjernet useEffect som setter nåværende og ønskede tapte dagsverk til
  // undefined dersom restStatus er IkkeLastet

  const harEndretTapteDagsverk = nåværendeTapteDagsverk !== undefined;

  // TODO: Denne kjører to ganger, fixme
  useEffect(() => {
    if (
      // TODO OBS: Fjernet sjekk på status===suksess her, har det noe å si?
      !harEndretTapteDagsverk
    ) {
      if (tapteDagsverkFraDb == undefined) {
        setNåværendeTapteDagsverk("");
        setManglerData(true);
      } else {
        setNåværendeTapteDagsverk(tapteDagsverkFraDb);
        setManglerData(false);
      }
    }
  }, [harEndretTapteDagsverk, tapteDagsverkFraDb, setManglerData]);

  const antallTapteDagsverkHjelpetekst = manglerData
    ? "Et dagsverk er arbeid som utføres på en dag. " +
      "Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år."
    : "NAV har legemeldt fravær tilgjengelig i sitt datagrunnlag. Vi ser på de siste 12 månedene " +
      "og beregner hvor mange dagsverk som er tapt. Et dagsverk er arbeid som utføres på en dag.";

  return (
    <>
      <div className={styles.inputrader_wrapper}>
        <Kalkulatorrad
          onChange={(event) => {
            setNåværendeTapteDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
          }}
          value={nåværendeTapteDagsverk?.toString()}
          label="Antall tapte dagsverk siste 12 måneder"
          visSpinner={nedlastingPågår}
          name="nåværende-tapte-dagsverk"
          hjelpetekst={antallTapteDagsverkHjelpetekst}
        />
        <Kalkulatorrad
          onChange={(event) => {
            setKostnadDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
          }}
          value={kostnadDagsverk?.toString()}
          label="Kostnad per dag per ansatt i kroner"
          placeholder="kr"
          name="kostnad-per-dagsverk"
          hjelpetekst={
            <>
              SINTEF har beregnet at en dags sykefravær gjennomsnittlig koster
              2600 kroner. Beløpet uttrykker produksjonstap og økte kostnader.
              Lønn og refusjoner knyttet til sykefravær er ikke en del av
              beregnet kostnad.{" "}
              <ExternalLink href="https://www.sintef.no/prosjekter/bedriftenes-kostnader-ved-sykefravar/">
                Les mer om hva som påvirker kostnader ved sykefravær.
              </ExternalLink>
            </>
          }
        />
        <Kalkulatorrad
          onChange={(event) => {
            setØnsketTapteDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
          }}
          value={ønsketTapteDagsverk?.toString()}
          label="Mål for sykefraværet i antall tapte dagsverk over 12 måneder"
          name="ønsket-tapte-dagsverk"
          hjelpetekst="Skriv inn mål for sykefraværet i antall tapte dagsverk i en periode på 12 måneder, for å beregne hvor mye du kan spare."
        />
      </div>
      <Kostnad
        nåværendeKostnad={getKostnadForAntallDagsverk(
          kostnadDagsverk,
          nåværendeTapteDagsverk
        )}
        ønsketKostnad={getKostnadForAntallDagsverk(
          kostnadDagsverk,
          ønsketTapteDagsverk
        )}
        ønsketRedusert={parseFloat(
          ønsketTapteDagsverk?.replace(",", ".") || "0"
        )}
        antallTapteDagsverkEllerProsent={Kalkulatorvariant.Dagsverk}
      />
    </>
  );
};
