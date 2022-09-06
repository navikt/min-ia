export const rundAvTilEnDesimal = (tall: number) => Math.round(tall * 10) / 10;

export enum Kalkulatorvariant {
  Dagsverk = "antallTapteDagsverk",
  Prosent = "sykefraværsprosent",
}

export const getKostnadForAntallDagsverk = (
  kostnadDagsverk: number | undefined,
  antallTapteDagsverk: number | undefined
) => {
  if (antallTapteDagsverk && !isNaN(antallTapteDagsverk) && kostnadDagsverk) {
    return antallTapteDagsverk * kostnadDagsverk;
  } else {
    return 0;
  }
};

export const getKostnadForSykefraværsprosent = (
  kostnadDagsverk: number | undefined,
  sykefraværsprosent: number | undefined,
  muligeDagsverk: number | undefined
) => {
  if (
    kostnadDagsverk &&
    sykefraværsprosent &&
    !isNaN(sykefraværsprosent) &&
    muligeDagsverk
  ) {
    return ((sykefraværsprosent * muligeDagsverk) / 100) * kostnadDagsverk;
  } else return 0;
};
