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
import { ExternalLink } from "@navikt/ds-icons";

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

  const brukerHarEndretSykefraværsprosenten =
    nåværendeSykefraværsprosent !== undefined &&
    nåværendeSykefraværsprosent !== "";

  useEffect(() => {
    if (!brukerHarEndretSykefraværsprosenten) {
      if (!sykefraværsprosentFraDb) {
        setNåværendeSykefraværsprosent("");
      } else {
        setNåværendeSykefraværsprosent(sykefraværsprosentFraDb);
        setTotaltAntallDagsverk(muligeDagsverkFraDb);
      }
    }
  }, [
    brukerHarEndretSykefraværsprosenten,
    muligeDagsverkFraDb,
    sykefraværsprosentFraDb,
  ]);

  const sykefraværHjelpetekst =
    "Sykefraværsprosenten regnes ut fra antall tapte dagsverk delt på antall mulige dagsverk.";
  const sykefraværRadHjelpetekst =
    sykefraværsprosentFraDb !== undefined
      ? sykefraværHjelpetekst +
        " Mulige dagsverk de siste 12 månedene er hentet fra det dere har meldt inn i A-ordningen."
      : sykefraværHjelpetekst;

  const ønsketTapteDagsverkSiste12MndHjelpetekst =
    "Når vi beregner mål for sykefraværet benytter vi samme antall mulige dagsverk som når vi" +
    " beregner nåværende sykefraværsprosent.";

  return (
    <>
      <div className={styles.inputrader_wrapper}>
        <Kalkulatorrad
          onChange={(event) => {
            setTotaltAntallDagsverk(
              validerDesimaltallOgReturnerMatch(event.target.value)
            );
          }}
          value={totaltAntallDagsverk}
          label="Totalt antall dagsverk i din bedrift siste 12 mnd"
          name="totalt-antall-dagsverk"
          hjelpetekst={
            <>
              Her kan du justere totalt antall dagsverk i din bedrift de siste
              tolv månedene. En ansatt som jobber full stilling i tolv måneder,
              utgjør 230 dagsverk.
            </>
          }
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
            setNåværendeSykefraværsprosent(
              validerProsenttallOgReturnerMatch(
                event.target.value,
                nåværendeSykefraværsprosent
              )
            );
          }}
          value={nåværendeSykefraværsprosent}
          label="Sykefravær i prosent de siste 12 månedene"
          visSpinner={!sykefraværsprosentFraDb}
          name="nåværende-prosent"
          hjelpetekst={sykefraværRadHjelpetekst}
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
          hjelpetekst={ønsketTapteDagsverkSiste12MndHjelpetekst}
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
