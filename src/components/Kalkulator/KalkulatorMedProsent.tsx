import React, { FunctionComponent, useEffect, useState } from "react";
import styles from "./Kalkulator.module.scss";
import Kostnad from "./Kostnad/Kostnad";
import {
  getKostnadForSykefraværsprosent,
  GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR,
  Kalkulatorvariant,
  parseFloatMedDefault,
  validerDesimaltallOgReturnerMatch,
  validerProsenttallOgReturnerMatch,
} from "./kalkulator-utils";
import { Kalkulatorrad } from "./Kalkulatorrad/Kalkulatorrad";

interface Props {
  muligeDagsverkFraDb?: string;
  sykefraværsprosentFraDb?: string;
  nedlastingPågår: boolean;
}

export const KalkulatorMedProsent: FunctionComponent<Props> = ({
  muligeDagsverkFraDb,
  sykefraværsprosentFraDb,
}) => {
  const [totaltAntallDagsverk, setTotaltAntallDagsverk] = useState<
    string | undefined
  >();

  const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] =
    useState<string | undefined>();

  const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<
    string | undefined
  >();

  const [kostnadDagsverk, setKostnadDagsverk] = useState<string | undefined>(
    GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR
  );

  const [brukerHarEndretInput, setBrukerHarEndretInput] =
    useState<boolean>(false);

  useEffect(() => {
    if (!brukerHarEndretInput) {
      setNåværendeSykefraværsprosent(sykefraværsprosentFraDb);
      setTotaltAntallDagsverk(muligeDagsverkFraDb);
    }
  }, [brukerHarEndretInput, muligeDagsverkFraDb, sykefraværsprosentFraDb]);

  return (
    <>
      <div className={styles.inputrader_wrapper}>
        <Kalkulatorrad
          onChange={(event) => {
            setTotaltAntallDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
            setBrukerHarEndretInput(true);
          }}
          value={totaltAntallDagsverk}
          label="Totalt antall dagsverk i din bedrift de siste 12 månedene"
          name="totalt-antall-dagsverk"
          hjelpetekst="En ansatt som jobber full stilling utgjør 230 dagsverk."
        />
        <Kalkulatorrad
          onChange={(event) => {
            setKostnadDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
          }}
          value={kostnadDagsverk}
          label="Kostnad per dag per ansatt i kroner"
          placeholder="kr"
          name="kostnad-per-dagsverk-prosent"
          hjelpetekst="SINTEF beregner kostnader ved sykefravær til 2600 kr per dag."
        />
        <Kalkulatorrad
          onChange={(event) => {
            setNåværendeSykefraværsprosent(
              validerProsenttallOgReturnerMatch(
                event.target.value,
                nåværendeSykefraværsprosent
              )
            );
            setBrukerHarEndretInput(true);
          }}
          value={nåværendeSykefraværsprosent}
          label="Sykefravær i prosent de siste 12 månedene"
          visLoader={!sykefraværsprosentFraDb}
          name="nåværende-prosent"
          hjelpetekst="Prosenten regnes ut fra avtalte og tapte dagsverk."
        />
        <Kalkulatorrad
          onChange={(event) => {
            setØnsketSykefraværsprosent(
              validerProsenttallOgReturnerMatch(
                event.target.value,
                ønsketSykefraværsprosent
              )
            );
          }}
          value={ønsketSykefraværsprosent}
          label="Mål for sykefraværet i prosent"
          name="ønsket-prosent"
        />
      </div>
      <Kostnad
        nåværendeKostnad={getKostnadForSykefraværsprosent(
          kostnadDagsverk,
          nåværendeSykefraværsprosent,
          totaltAntallDagsverk
        )}
        ønsketKostnad={getKostnadForSykefraværsprosent(
          kostnadDagsverk,
          ønsketSykefraværsprosent,
          totaltAntallDagsverk
        )}
        ønsketRedusert={parseFloatMedDefault(ønsketSykefraværsprosent)}
        antallTapteDagsverkEllerProsent={Kalkulatorvariant.Prosent}
      />
    </>
  );
};
