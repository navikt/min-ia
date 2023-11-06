export const formaterProsent = (prosent: number | null | undefined): string => {
  if (prosent === undefined || prosent === null) {
    return "";
  }
  return Number(prosent).toFixed(1).toString().replace(".", ",");
};

export const parseVerdi = (verdi: string) => {
  return parseFloat(verdi.replace(",", "."));
};
