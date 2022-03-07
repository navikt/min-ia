import { FunctionComponent } from "react";
import {
  KvartalsvisSykefraværshistorikk,
  KvartalsvisSykefraværsprosent,
  SykefraværshistorikkType,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";
import styles from "./Infographic.module.scss";
import { InfographicSnippet } from "../InfographicSnippet/InfographicSnippet";
import { NorwegianFlag } from "@navikt/ds-icons";
import { Bag } from "@navikt/ds-icons";
import { HealthCase } from "@navikt/ds-icons";
import { Up } from "@navikt/ds-icons";
import { BodyLong, Link } from "@navikt/ds-react";

export const Infographic: FunctionComponent<{
  historikk: KvartalsvisSykefraværshistorikk[];
}> = ({ historikk }) => {
  let sisteFraværsprosentNorge = sisteTilgjengelige(
    sykefraværINorge(historikk)
  )?.prosent;

  let sisteFraværsprosentNæring = sisteTilgjengelige(
    getSykefraværForNæring(historikk)
  )?.prosent;

  let trend = kalkulerTrend(getSykefraværForNæring(historikk));
  let trendSomTekst = stigningskurveTilTekst(trend);

  return (
    <div className={styles.infographicWrapper}>
      <InfographicSnippet
        ikon={<NorwegianFlag width="55px" height="55px" />}
        tekst={"Sykefraværsprosenten i Norge akkurat nå er: "}
        verdi={sisteFraværsprosentNorge + "%"}
      />

      <InfographicSnippet
        ikon={<Bag width="55px" height="55px" />}
        tekst={"Sykefraværsprosenten i din bransje akkurat nå er: "}
        verdi={sisteFraværsprosentNæring + "%"}
      />

      <InfographicSnippet
        ikon={<HealthCase width="55px" height="55px" />}
        tekst={"Viktigste årsak til sykemelding er: "}
        verdi={"Muskel- og skjelettplager"}
      />

      <InfographicSnippet
        ikon={<Up width="55px" height="55px" />}
        tekst={"Sykefraværsprosenten i din bransje akkurat nå er "}
        verdi={trendSomTekst}
      />
      <BodyLong size="medium">
        Synes du denne informasjonen var bra? På{" "}
        <Link href={"#"}>statistikksiden</Link> får du oversikt over
        sykefraværet over tid.
      </BodyLong>
    </div>
  );
};

// TODO: Refaktorer ut disse funksjonene. Denne komponenten skal ikke være ansvarlig for datatransformasjon.
// Ideelt skal ikke mer data eksponeres til komponenten enn akkurat hva den har bruk for.
function sykefraværINorge(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk {
  const [historikkForNorge] = fraværshistorikk.filter(
    (historikk) =>
      historikk.type === SykefraværshistorikkType.LAND &&
      historikk.label === "Norge"
  );

  return historikkForNorge;
}

function sisteTilgjengelige(
  historikk: KvartalsvisSykefraværshistorikk
): KvartalsvisSykefraværsprosent | null {
  if (!historikk?.kvartalsvisSykefraværsprosent) {
    return null;
  }
  const sortert = sorterKronologisk(historikk);
  return sortert[sortert.length - 1];
}

function getSykefraværForNæring(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk {
  const [historikkForNæring] = fraværshistorikk.filter(
    (historikk) => historikk.type === SykefraværshistorikkType.NÆRING
  );

  return historikkForNæring;
}

function getDataForEnkeltkvartal(
  fraværshistorikk: KvartalsvisSykefraværsprosent[],
  årstall: number,
  kvartal: number
): KvartalsvisSykefraværsprosent {
  const [enkeltkvartal] = fraværshistorikk.filter(
    (kvartalstall) =>
      kvartalstall.årstall === årstall && kvartalstall.kvartal === kvartal
  );

  return enkeltkvartal;
}

function kalkulerTrend(
  fraværsistorikk: KvartalsvisSykefraværshistorikk
): number | undefined {
  if (!fraværsistorikk?.kvartalsvisSykefraværsprosent) {
    return undefined;
  }
  const sortert = sorterKronologisk(fraværsistorikk);
  const nyesteDatapunkt = sortert[sortert.length - 1];
  const sisteTilgjengeligeÅrstall = nyesteDatapunkt.årstall;
  const sisteTilgjengeligeKvartal = nyesteDatapunkt.kvartal;
  const prosentSisteKvartal = nyesteDatapunkt.prosent;

  const prosentSammeKvartalIFjor = getDataForEnkeltkvartal(
    fraværsistorikk.kvartalsvisSykefraværsprosent,
    sisteTilgjengeligeÅrstall - 1,
    sisteTilgjengeligeKvartal
  )?.prosent;

  if (prosentSisteKvartal && prosentSammeKvartalIFjor) {
    return prosentSisteKvartal - prosentSammeKvartalIFjor;
  }
  return undefined;
}

function stigningskurveTilTekst(stigning: number | undefined): string {
  if (stigning === undefined) {
    return "-";
  } else if (stigning > 0) {
    return "stigende";
  } else if (stigning < 0) {
    return "synkende";
  } else {
    return "uendret";
  }
}

function sorterKronologisk(historikk: KvartalsvisSykefraværshistorikk) {
  return historikk.kvartalsvisSykefraværsprosent.sort(
    (e1, e2) => e1.årstall - e2.årstall || e1.kvartal - e2.kvartal
  );
}
