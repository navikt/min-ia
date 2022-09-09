import React, { FunctionComponent, useEffect, useState } from "react";
import "./Kalkulator.scss";
import Kostnad from "./../Kostnad/Kostnad";
import {
  getKostnadForSykefraværsprosent,
  Kalkulatorvariant,
  rundAvTilEnDesimal,
} from "../kalkulator-utils";
import { Kalkulatorrad } from "./Kalkulatorrad/Kalkulatorrad";
import { RestStatus } from "../../../integrasjoner/rest-status";
import { ExternalLink } from "@navikt/ds-icons";

interface Props {
  muligeDagsverkFraDb?: number;
  sykefraværsprosentFraDb?: number;
}

export const KalkulatorMedProsent: FunctionComponent<Props> = ({
  muligeDagsverkFraDb,
  sykefraværsprosentFraDb,
}) => {
  const [totaltAntallDagsverk, setTotaltAntallDagsverk] = useState<
    number | undefined
  >();

  const [nåværendeSykefraværsprosent, setNåværendeSykefraværsprosent] =
    useState<number | undefined>();

  const [ønsketSykefraværsprosent, setØnsketSykefraværsprosent] = useState<
    number | undefined
  >();

  const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(
    2600
  );

  const brukerHarEndretSykefraværsprosenten =
    nåværendeSykefraværsprosent !== undefined;

  // TODO: trekk alle disse ut, i egne hooks

  const validerOgSettNåværendeSykefraværsprosent = (input: number) => {
    if (!validerSykefraværsprosent(input)) {
      return;
    }
    try {
      setNåværendeSykefraværsprosent(Number(input.toFixed(1)));
    } catch (e) {
      setNåværendeSykefraværsprosent(0);
    }
  };

  const validerOgSettØnsketSykefraværsprosent = (input: number) => {
    if (!validerSykefraværsprosent(input)) {
      return;
    }
    setØnsketSykefraværsprosent(Number(input.toFixed(1)));
  };

  const validerSykefraværsprosent = (input: number): boolean => {
    return 0 <= input && input <= 100;
  };

  const validerTapteDagsverk = (input: number): boolean => {
    return 0 <= input && input <= 9999999;
  };

  const validerOgSettMuligeDagsverk = (muligeDagsverkInput: number) => {
    if (validerTapteDagsverk(muligeDagsverkInput)) {
      setTotaltAntallDagsverk(muligeDagsverkInput);
    }
  };

  // TODO: Denne kjører to ganger, fixme
  useEffect(() => {
    if (
      // TODO OBS: Fjernet sjekk på status===suksess her, har det noe å si?
      !brukerHarEndretSykefraværsprosenten
    ) {
      if (!sykefraværsprosentFraDb) {
        setNåværendeSykefraværsprosent(0);
      } else {
        setNåværendeSykefraværsprosent(
          rundAvTilEnDesimal(sykefraværsprosentFraDb)
        );
        setTotaltAntallDagsverk(muligeDagsverkFraDb);
      }
    }
  }, [
    brukerHarEndretSykefraværsprosenten,
    muligeDagsverkFraDb,
    sykefraværsprosentFraDb,
  ]);

  const sykefraværRadHjelpetekst =
    sykefraværsprosentFraDb !== undefined
      ? "Sykefraværsprosenten regnes ut fra antall tapte dagsverk delt på antall mulige dagsverk. " +
        "Mulige dagsverk de siste 12 månedene er hentet fra det dere har meldt inn i A-ordningen."
      : undefined;

  const ønsketTapteDagsverkSiste12MndHjelpetekst =
    sykefraværsprosentFraDb !== undefined
      ? "Når vi beregner mål for sykefraværet benytter vi samme antall mulige dagsverk som når vi beregner nåværende sykefraværsprosent."
      : undefined;

  return (
    <>
      <div className={"kalkulator__inputrader_wrapper"}>
        <Kalkulatorrad
          onChange={(event) => {
            validerOgSettMuligeDagsverk(parseInt(event.target.value));
          }}
          value={totaltAntallDagsverk}
          label="Totalt antall dagsverk i din bedrift siste 12 mnd"
          name="totalt-antall-dagsverk"
          step={100}
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
            setKostnadDagsverk(parseInt(event.target.value));
          }}
          value={kostnadDagsverk}
          label="Kostnad per dag per ansatt i kroner"
          step={10}
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
            validerOgSettNåværendeSykefraværsprosent(
              parseFloat(event.target.value)
            );
          }}
          value={nåværendeSykefraværsprosent}
          label="Sykefravær i prosent de siste 12 månedene"
          step={0.1}
          visSpinner={!sykefraværsprosentFraDb}
          name="nåværende-prosent"
          hjelpetekst={sykefraværRadHjelpetekst}
        />
        <Kalkulatorrad
          onChange={(event) => {
            validerOgSettØnsketSykefraværsprosent(
              parseFloat(event.target.value)
            );
          }}
          value={ønsketSykefraværsprosent}
          label="Mål for sykefraværet i prosent"
          step={0.1}
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
        ønsketRedusert={ønsketSykefraværsprosent as number}
        antallTapteDagsverkEllerProsent={Kalkulatorvariant.Prosent}
      />
    </>
  );
};
