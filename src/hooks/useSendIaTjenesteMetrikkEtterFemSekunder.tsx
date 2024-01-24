import { useEffect } from "react";
import { sendDigitalIaTjenesteMetrikk } from "../integrasjoner/ia-tjenestemetrikker-api";
import { useOrgnr } from "./useOrgnr";

export function useSendIaMetrikkEtterFemSekunder() {
  const orgnr = useOrgnr();

  useEffect(() => {
    const timer = setTimeout(() => {
      sendDigitalIaTjenesteMetrikk(orgnr);
    }, 5000);
    return () => clearTimeout(timer);
  }, [orgnr]);
}
