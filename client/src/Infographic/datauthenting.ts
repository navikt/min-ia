import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../integrasjoner/aggregert-statistikk-api";
import { InfographicData } from "./Infographic";

export function hentUtInfographicData(
  data: AggregertStatistikkDto
): InfographicData {
  return {
    sykefraværNorge: data.prosentSiste4Kvartaler.find(
      (s) => s.statistikkategori == Statistikkategori.LAND
    ),
    sykefraværBransje: data.prosentSiste4Kvartaler.find(
      (s) => s.statistikkategori == Statistikkategori.BRANSJE
    ),
    sykefraværNæring: data.prosentSiste4Kvartaler.find(
      (s) => s.statistikkategori == Statistikkategori.NÆRING
    ),
    trendBransje: data.trend.find(
      (s) => s.statistikkategori == Statistikkategori.BRANSJE
    ),
    trendNæring: data.trend.find(
      (s) => s.statistikkategori == Statistikkategori.NÆRING
    ),
  };
}
