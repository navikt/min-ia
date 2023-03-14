import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../integrasjoner/aggregert-statistikk-api";
import {SykefraværsstatistikkData} from "../../Forside/Sykefraværsstatistikk/Sykefraværsstatistikk";

export function hentUtSykefraværsstatistikkData(
  data: AggregertStatistikkDto
): SykefraværsstatistikkData {
  const fraværsprosentNorge = data.prosentSiste4KvartalerTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.LAND
  );
  const fraværsprosentNæring = data.prosentSiste4KvartalerTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.NÆRING
  );
  const fraværsprosentBransje = data.prosentSiste4KvartalerTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.BRANSJE
  );
  const trendBransje = data.trendTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.BRANSJE
  );
  const trendNæring = data.trendTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.NÆRING
  );
  return {
    fraværsprosentNorge: fraværsprosentNorge?.verdi.replace(".", ","),
    fraværsprosentBransjeEllerNæring: (
      fraværsprosentBransje ?? fraværsprosentNæring
    )?.verdi.replace(".", ","),
    stigningstallTrendBransjeEllerNæring: Number(
      (trendBransje ?? trendNæring)?.verdi
    ),
    bransjeEllerNæring: fraværsprosentBransje ? "bransje" : "næring",
    bransjeEllerNæringLabel: (fraværsprosentBransje ?? fraværsprosentNæring)
      ?.label,
  };
}
