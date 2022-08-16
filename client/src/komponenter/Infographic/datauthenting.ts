import {
  AggregertStatistikkDto,
  Statistikkategori,
  StatistikkDto,
} from "../../integrasjoner/aggregert-statistikk-api";
import { InfographicData } from "./Infographic";

export function hentUtInfographicData(
  data: AggregertStatistikkDto
): InfographicData {
  const fraværsprosentNorge: StatistikkDto | undefined =
    data.prosentSiste4Kvartaler?.find(
      (s) => s.statistikkategori == Statistikkategori.LAND
    );
  const fraværsprosentNæring = data.prosentSiste4Kvartaler?.find(
    (s) => s.statistikkategori == Statistikkategori.NÆRING
  );
  const fraværsprosentBransje = data.prosentSiste4Kvartaler?.find(
    (s) => s.statistikkategori == Statistikkategori.BRANSJE
  );
  const trendBransje = data.trend?.find(
    (s) => s.statistikkategori == Statistikkategori.BRANSJE
  );
  const trendNæring = data.trend?.find(
    (s) => s.statistikkategori == Statistikkategori.NÆRING
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
