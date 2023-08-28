import { useRouter } from "next/router";

export const useOrgnr = (): string | undefined => {
  const router = useRouter();
  const orgnr = router?.query.bedrift as string;

  return erGyldigOrgnr(orgnr) ? orgnr : undefined;
};

export const erGyldigOrgnr = (orgnr?: string) => {
  if (!orgnr) {
    return false;
  }
  const orgnrRegex = /^\d{9}$/;
  return orgnrRegex.test(orgnr);
};
