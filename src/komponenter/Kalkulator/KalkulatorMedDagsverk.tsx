import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./Kalkulator.module.scss";
import Kostnad from "./Kostnad/Kostnad";
import {
  getKostnadForAntallDagsverk,
  GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR,
  Kalkulatorvariant,
  parseFloatMedDefault,
  validerDesimaltallOgReturnerMatch,
} from "./kalkulator-utils";
import { Kalkulatorrad } from "./Kalkulatorrad/Kalkulatorrad";

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

  const [kostnadDagsverk, setKostnadDagsverk] = useState<string | undefined>(
    GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR
  );

  const [
    brukerHarEndretTapteDagsverkInput,
    setBrukerHarEndretTapteDagsverkInput,
  ] = useState<boolean>(false);

  useEffect(() => {
    if (!brukerHarEndretTapteDagsverkInput && tapteDagsverkFraDb !== undefined) {
      setNåværendeTapteDagsverk(tapteDagsverkFraDb);
    }
  }, [brukerHarEndretTapteDagsverkInput, tapteDagsverkFraDb]);

  return (
    <>
      <div className={styles.inputrader_wrapper}>
        <Kalkulatorrad
          onChange={(event) => {
            setNåværendeTapteDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
            setBrukerHarEndretTapteDagsverkInput(true);
          }}
          value={nåværendeTapteDagsverk?.toString()}
          label="Antall tapte dagsverk siste 12 måneder"
          visLoader={nedlastingPågår}
          name="nåværende-tapte-dagsverk"
          hjelpetekst="En ansatt som jobber full stilling utgjør 230 dagsverk."
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
          hjelpetekst="SINTEF beregner kostnader ved sykefravær til 2600 kr per dag."
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
        ønsketRedusert={parseFloatMedDefault(ønsketTapteDagsverk)}
        antallTapteDagsverkEllerProsent={Kalkulatorvariant.Dagsverk}
      />
    </>
  );
};
