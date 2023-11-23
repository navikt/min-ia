import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../integrasjoner/aggregert-statistikk-api";
import { KalkulatorData } from "./Kalkulator";

export const hentUtKalkulatorData = (
  data: AggregertStatistikkDto
): KalkulatorData => {
  const muligeDagsverk = data.muligeDagsverkTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  const tapteDagsverk = data.tapteDagsverkTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  const fraværsprosentVirksomhet = data.prosentSiste4KvartalerTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  return {
    fraværsprosentVirksomhet: fraværsprosentVirksomhet?.verdi?.replace(
      ".",
      ","
    ),
    tapteDagsverk: tapteDagsverk?.verdi?.replace(".", ","),
    muligeDagsverk: muligeDagsverk?.verdi?.replace(".", ","),
  };
};
