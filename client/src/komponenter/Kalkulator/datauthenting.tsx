import {
  AggregertStatistikkDto,
  Statistikkategori,
} from "../../integrasjoner/aggregert-statistikk-api";
import { KalkulatorData } from "./Kalkulator/Fraværskalkulator";

export const hentUtKalkulatorData = (
  data: AggregertStatistikkDto
): KalkulatorData => {
  const muligeDagsverk = data.muligeDavgverk?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  const tapteDagsverk = data.tapteDagsverk?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  const fraværsprosentVirksomhet = data.prosentSiste4KvartalerTotalt?.find(
    (s) => s.statistikkategori === Statistikkategori.VIRKSOMHET
  );
  return {
    fraværsprosentVirksomhet: Number(fraværsprosentVirksomhet?.verdi),
    tapteDagsverk: Number(tapteDagsverk?.verdi),
    muligeDagsverk: Number(muligeDagsverk?.verdi),
  };
};
