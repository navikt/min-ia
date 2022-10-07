export const GJENNOMSNITTLIG_DAGLIG_KOSTNAD_SYKEFRAVÆR = "2600";

export enum Kalkulatorvariant {
  Dagsverk = "antallTapteDagsverk",
  Prosent = "sykefraværsprosent",
}

export function parseFloatMedDefault(value: string | undefined): number {
  return parseFloat(value?.replace(",", ".") || "0");
}

export const getKostnadForAntallDagsverk = (
  kostnadDagsverk: string | undefined,
  antallTapteDagsverk: string | undefined
) => {
  const kostnadDagsverkNum = parseFloatMedDefault(kostnadDagsverk);
  const antallTapteDagsverkNum = parseFloatMedDefault(antallTapteDagsverk);

  if (!isNaN(kostnadDagsverkNum) && !isNaN(antallTapteDagsverkNum)) {
    return antallTapteDagsverkNum * kostnadDagsverkNum;
  } else return 0;
};

export const getKostnadForSykefraværsprosent = (
  kostnadDagsverk: string | undefined,
  sykefraværsprosent: string | undefined,
  muligeDagsverk: string | undefined
) => {
  const kostnadDagsverkNum = parseFloatMedDefault(kostnadDagsverk);
  const sykefraværsprosentNum = parseFloatMedDefault(sykefraværsprosent);
  const muligeDagsverkNum = parseFloatMedDefault(muligeDagsverk);
  if (
    !isNaN(kostnadDagsverkNum) &&
    !isNaN(sykefraværsprosentNum) &&
    !isNaN(muligeDagsverkNum)
  ) {
    return (
      ((sykefraværsprosentNum * muligeDagsverkNum) / 100) * kostnadDagsverkNum
    );
  } else return 0;
};

export function validerDesimaltallOgReturnerMatch(
  input?: string
): string | undefined {
  return input?.match(/[0-9]*[,.]?[0-9]{0,2}/)?.at(0);
}

export function validerProsenttallOgReturnerMatch(
  input?: string,
  forrigeVerdi?: string
): string | undefined {
  const inputSomTall: number = parseFloatMedDefault(input);

  if (input === "100" || input === "." || input === ",") {
    return input;
  } else if (0 <= inputSomTall && inputSomTall <= 100) {
    return input?.match(/[0-9]{0,2}[,.]?[0-9]{0,2}/)?.at(0);
  } else {
    return forrigeVerdi;
  }
}
