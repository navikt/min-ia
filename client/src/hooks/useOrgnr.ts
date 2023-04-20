import { useRouter } from "next/router";

export const useOrgnr = (): string | null => {
  const router = useRouter();
  const orgnr = router?.query.bedrift as string;

  return erGyldigOrgnr(orgnr) ? orgnr : null;
};

export const erGyldigOrgnr = (orgnr?: string) => {
  if (!orgnr) {
    return false;
  }
  const orgnrRegex = /^\d{9}$/;
  return orgnrRegex.test(orgnr);
};
