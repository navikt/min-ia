import React, { FunctionComponent, useEffect, useState } from "react";
import "./Kalkulator.less";
import Kostnad from "./../Kostnad/Kostnad";
import {
  getKostnadForAntallDagsverk,
  Kalkulatorvariant,
} from "../kalkulator-utils";
import { Kalkulatorrad } from "./Kalkulatorrad/Kalkulatorrad";
import { ExternalLink } from "@navikt/ds-icons";

export interface Props {
  tapteDagsverkFraDb?: number;
}

export const KalkulatorMedDagsverk: FunctionComponent<Props> = ({
  tapteDagsverkFraDb,
}) => {
  const [nåværendeTapteDagsverk, setNåværendeTapteDagsverk] = useState<
    number | undefined
  >(tapteDagsverkFraDb);

  const [ønsketTapteDagsverk, setØnsketTapteDagsverk] = useState<
    number | undefined
  >();

  const [manglerData, setManglerData] = useState<boolean | undefined>();
  const [kostnadDagsverk, setKostnadDagsverk] = useState<number | undefined>(
    2600
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
      const tapteDagsverkSiste4Kvartaler = tapteDagsverkFraDb;
      if (tapteDagsverkSiste4Kvartaler == undefined) {
        setNåværendeTapteDagsverk(0);
        setManglerData(true);
      } else {
        setNåværendeTapteDagsverk(tapteDagsverkSiste4Kvartaler);
        setManglerData(false);
      }
    }
  }, [harEndretTapteDagsverk, tapteDagsverkFraDb, setManglerData]);

  const antallTapteDagsverkHjelpetekst = manglerData
    ? "Et dagsverk er arbeid som utføres på en dag. " +
      "Ved fulltidsstilling regnes en hel stilling som ca 230 dagsverk per år."
    : "NAV har legemeldt fravær tilgjengelig i sitt datagrunnlag. Vi ser på de siste 12 månedene " +
      "og beregner hvor mange dagsverk som er tapt. Et dagsverk er arbeid som utføres på en dag.";

  const validerTapteDagsverk = (tapteDagsverk: number): boolean => {
    return tapteDagsverk >= 0;
  };

  const validerOgSettNåværendeTapteDagsverk = (tapteDagsverk: number) => {
    try {
      setNåværendeTapteDagsverk(Number(tapteDagsverk.toFixed(0)));
    } catch (e: any) {
      // TODO OBS: Er dette i tilfelle brukeren skriver inn noe annet enn et nummer?
      setNåværendeTapteDagsverk(0);
      console.log(e.message);
    }
  };

  const validerOgSettØnsketTapteDagsverk = (tapteDagsverk: number) => {
    if (!validerTapteDagsverk(tapteDagsverk)) {
      return;
    }
    setØnsketTapteDagsverk(Number(tapteDagsverk.toFixed(0)));
  };

  return (
    <>
      <div className={"kalkulator__inputrader_wrapper"}>
        <Kalkulatorrad
          onChange={(event) => {
            validerOgSettNåværendeTapteDagsverk(parseFloat(event.target.value));
          }}
          value={nåværendeTapteDagsverk}
          label="Antall tapte dagsverk siste 12 måneder"
          // TODO: Bruk "lastetInn"-prop ala det vi har for infographic til å bestemme spinner:
          visSpinner={!tapteDagsverkFraDb}
          name="nåværende-tapte-dagsverk"
          hjelpetekst={antallTapteDagsverkHjelpetekst}
        />
        <Kalkulatorrad
          onChange={(event) => {
            setKostnadDagsverk(parseInt(event.target.value));
          }}
          value={kostnadDagsverk}
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
            validerOgSettØnsketTapteDagsverk(parseFloat(event.target.value));
          }}
          value={ønsketTapteDagsverk}
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
        ønsketRedusert={ønsketTapteDagsverk as number}
        antallTapteDagsverkEllerProsent={Kalkulatorvariant.Dagsverk}
      />
    </>
  );
};
