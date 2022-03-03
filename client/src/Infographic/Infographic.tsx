import {FunctionComponent} from "react";
import {
  KvartalsvisSykefraværshistorikk,
  KvartalsvisSykefraværsprosent,
  SykefraværshistorikkType,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";

export const Infographic: FunctionComponent<{
  historikk: KvartalsvisSykefraværshistorikk[];
}> = ({historikk}) => {
  let sisteFraværsprosentNorge = sisteTilgjengelige(
      sykefraværINorge(historikk)
  ).prosent;

  let sisteFraværsprosentNæring = sisteTilgjengelige(
      getSykefraværForNæring(historikk)
  ).prosent;

  let trend = kalkulerTrend(getSykefraværForNæring(historikk));

  return (
      <div>
        <p>{sisteFraværsprosentNorge}</p>
        <p>{sisteFraværsprosentNæring}</p>
        <p>Viktigste årsak til sykemelding er: [årsak]</p>
        <p>{trend}</p>
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

function sisteTilgjengelige(historikk: KvartalsvisSykefraværshistorikk) {
  const sortert = sorterKronologisk(historikk)
  return sortert[sortert.length - 1]
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
): number | null {
  const sortert = sorterKronologisk(fraværsistorikk)
  const nyesteDatapunkt = sortert[sortert.length - 1]
  const sisteTilgjengeligeÅrstall = nyesteDatapunkt.årstall
  const sisteTilgjengeligeKvartal = nyesteDatapunkt.kvartal
  const prosentSisteKvartal = nyesteDatapunkt.prosent

  const prosentSammeKvartalIFjor = getDataForEnkeltkvartal(
      fraværsistorikk.kvartalsvisSykefraværsprosent,
      sisteTilgjengeligeÅrstall - 1,
      sisteTilgjengeligeKvartal
  )?.prosent;

  if (prosentSisteKvartal && prosentSammeKvartalIFjor) {
    return prosentSisteKvartal - prosentSammeKvartalIFjor;
  }

  return null;
}

function sorterKronologisk(historikk: KvartalsvisSykefraværshistorikk) {
  return historikk.kvartalsvisSykefraværsprosent.sort(
      (e1, e2) => e2.årstall - e1.årstall || e2.kvartal - e1.kvartal
  );

}