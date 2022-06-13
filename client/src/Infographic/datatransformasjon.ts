import {
  KvartalsvisSykefraværshistorikk,
  KvartalsvisSykefraværsprosent,
  SykefraværshistorikkType,
} from "../integrasjoner/kvartalsvis-sykefraværshistorikk-api";
import { InfographicData } from "./Infographic";

export function kalkulerInfographicData(
  historikk: KvartalsvisSykefraværshistorikk[]
): InfographicData {
  return {
    sykefraværNorge: sisteTilgjengelige(sykefraværINorge(historikk))?.prosent,
    sykefraværBransje: sisteTilgjengelige(getSykefraværForBransje(historikk))
      ?.prosent,
    sykefraværNæring: sisteTilgjengelige(getSykefraværForNæring(historikk))
      ?.prosent,
    trendStigningstall: kalkulerTrend(
      getSykefraværForBransjeEllerNæring(historikk)
    ),
  };
}

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

function getSykefraværForBransje(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk {
  const [historikkForBransje] = fraværshistorikk.filter(
    (historikk) => historikk.type === SykefraværshistorikkType.BRANSJE
  );
  return historikkForBransje;
}

function getSykefraværForNæring(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk {
  const [historikkForNæring] = fraværshistorikk.filter(
    (historikk) => historikk.type === SykefraværshistorikkType.NÆRING
  );
  return historikkForNæring;
}

function getSykefraværForBransjeEllerNæring(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): KvartalsvisSykefraværshistorikk {
  const historikkForBransje: KvartalsvisSykefraværshistorikk =
    getSykefraværForBransje(fraværshistorikk);

  if (historikkForBransje?.kvartalsvisSykefraværsprosent.length > 0) {
    return historikkForBransje;
  }

  return getSykefraværForNæring(fraværshistorikk);
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

export function getBransjeEllerNæringLabel(
  fraværshistorikk: KvartalsvisSykefraværshistorikk[]
): string {
  const [historikkForBransje] = fraværshistorikk.filter(
    (historikk) => historikk.type === SykefraværshistorikkType.BRANSJE
  );
  const [historikkForNæring] = fraværshistorikk.filter(
    (historikk) => historikk.type === SykefraværshistorikkType.NÆRING
  );
  console.log("historikkForBransje:",historikkForBransje)
  console.log("historikkForNæring:",historikkForNæring)
  return historikkForBransje !== undefined
    ? historikkForBransje?.label
    : historikkForNæring?.label;
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

function sorterKronologisk(historikk: KvartalsvisSykefraværshistorikk) {
  return historikk.kvartalsvisSykefraværsprosent.sort(
    (e1, e2) => e1.årstall - e2.årstall || e1.kvartal - e2.kvartal
  );
}
