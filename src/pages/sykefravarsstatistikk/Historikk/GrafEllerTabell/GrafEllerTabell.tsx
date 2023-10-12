import React from "react";
import Graf from "./Graf/Graf";
import Tabell from "./Tabell/Tabell";
import {
  getHistorikkLabels,
  historikkHarOverordnetEnhet,
  konverterTilKvartalsvisSammenligning,
} from "../../utils/sykefraværshistorikk-utils";
import { CsvDownloadLink } from "../../Forside/LastNedKnapp/CsvDownloadLink";
import { getLinjerSomHarData } from "./Graf/graf-utils";
import {
  HistorikkLabel,
  KvartalsvisSammenligning,
} from "../../utils/sykefraværshistorikk-utils";
import { Suksess } from "../../../../integrasjoner/rest-status";
import { KvartalsvisSykefraværshistorikk } from "../../hooks/useSykefraværAppData";

const defaultLinjer: readonly HistorikkLabel[] = [
  "virksomhet",
  "overordnetEnhet",
  "næringEllerBransje",
] as const;

function useGrafLinjerSomSkalVises(
  kvartalsvisSammenligning: KvartalsvisSammenligning[]
) {
  const linjerSomKanVises = getLinjerSomHarData(kvartalsvisSammenligning);
  const linjeFilter = listFilterBuilder(linjerSomKanVises);
  const [linjerSomSkalVises, setLinjerSomSkalVises] = React.useState<
    HistorikkLabel[]
  >(defaultLinjer.filter(linjeFilter));

  return { linjerSomKanVises, linjerSomSkalVises, setLinjerSomSkalVises };
}

export default function GrafEllerTabell({
  restSykefraværsstatistikk,
  grafEllerTabell,
}: {
  restSykefraværsstatistikk: Suksess<KvartalsvisSykefraværshistorikk[]>;
  grafEllerTabell: string;
}) {
  const harOverordnetEnhet = historikkHarOverordnetEnhet(
    restSykefraværsstatistikk.data
  );
  const historikkLabels = getHistorikkLabels(restSykefraværsstatistikk.data);
  const kvartalsvisSammenligning = konverterTilKvartalsvisSammenligning(
    restSykefraværsstatistikk.data
  );
  const kvartalsvisSammenligningReversed = [
    ...kvartalsvisSammenligning,
  ].reverse();
  const grafLinjerSomSkalVisesResult = useGrafLinjerSomSkalVises(
    kvartalsvisSammenligning
  );

  return (
    <>
      {grafEllerTabell === "graf" ? (
        <Graf
          {...grafLinjerSomSkalVisesResult}
          kvartalsvisSammenligning={kvartalsvisSammenligning}
          historikkLabels={historikkLabels}
        />
      ) : (
        <Tabell
          kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
          historikkLabels={historikkLabels}
          harOverordnetEnhet={harOverordnetEnhet}
        />
      )}
      <CsvDownloadLink
        kvartalsvisSammenligning={kvartalsvisSammenligningReversed}
        harOverordnetEnhet={harOverordnetEnhet}
        historikkLabels={historikkLabels}
        onClick={() => {
          // TODO: Send metrikk
          //sendKnappEvent('last ned csv')
        }}
      />
    </>
  );
}

const listFilterBuilder = <T, U extends T>(
  list: U[] | readonly U[]
): ((element: T) => element is U) => {
  return (element: T): element is U => list.includes(element as U);
};
