export const formaterProsent = (prosent: Sykefraværsprosent): string => {
  if (prosent.erMaskert) {
    return "***";
  } else if (prosent.prosent === undefined) {
    return "";
  } else {
    return (prosent.prosent + " %").replace(".", ",");
  }
};

export type Sykefraværsprosent =
  | {
      erMaskert: true;
      prosent: null;
      tapteDagsverk: null;
      muligeDagsverk: null;
    }
  | {
      erMaskert: false;
      prosent: number | undefined;
      tapteDagsverk: number | undefined;
      muligeDagsverk: number | undefined;
    };
