import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../integrasjoner/aggregert-statistikk-api";
import { InfographicData } from "./Infographic";

export function hentUtInfographicData(
  data: AggregertStatistikkDto
): InfographicData {
  const fraværsprosentNorge = data.prosentSiste4Kvartaler.find(
    (s) => s.statistikkategori == Statistikkategori.LAND
  );
  const fraværsprosentNæring = data.prosentSiste4Kvartaler.find(
    (s) => s.statistikkategori == Statistikkategori.BRANSJE
  );
  const fraværsprosentBransje = data.prosentSiste4Kvartaler.find(
    (s) => s.statistikkategori == Statistikkategori.NÆRING
  );
  const trendBransje = data.trend.find(
    (s) => s.statistikkategori == Statistikkategori.BRANSJE
  );
  const trendNæring = data.trend.find(
    (s) => s.statistikkategori == Statistikkategori.NÆRING
  );

  return {
    fraværsprosentNorge,
    fraværsprosentBransjeEllerNæring:
      fraværsprosentBransje ?? fraværsprosentNæring,
    trendBransjeEllerNæring: trendBransje ?? trendNæring,
  };
}
