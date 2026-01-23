import { Statistikkategori } from "../../domene/statistikkategori";
import { RestAggregertStatistikk } from "../../hooks/useSykefraværAppData";

export const getBransjeEllerNæringKategori = (
  aggregertStatistikk: RestAggregertStatistikk,
) => {
  const bransjedata = aggregertStatistikk.aggregertData?.get(
    Statistikkategori.BRANSJE,
  )?.prosentSiste4KvartalerTotalt?.verdi;
  if (bransjedata !== undefined) return Statistikkategori.BRANSJE;
  return Statistikkategori.NÆRING;
};
