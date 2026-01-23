import { useOrgnrContext } from "../utils/OrgnrContext";

export const useOrgnr = (): string | undefined => {
  const { orgnr: orgNr } = useOrgnrContext();

  return erGyldigOrgnr(orgNr || undefined) ? orgNr || undefined : undefined;
};

export const erGyldigOrgnr = (orgnr?: string) => {
  if (!orgnr) {
    return false;
  }
  const orgnrRegex = /^\d{9}$/;
  return orgnrRegex.test(orgnr);
};
