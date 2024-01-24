import { useEffect } from "react";
import { sendDigitalIaTjenesteMetrikk } from "../integrasjoner/ia-tjenestemetrikker-api";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";
import { useOrgnr } from "./useOrgnr";

export function useSendIaMetrikkEtterFemSekunder() {
  const orgnr = useOrgnr();

  useEffect(() => {
    const timer = setTimeout(() => {
      sendDigitalIaTjenesteMetrikk(MetrikkKilde.FOREBYGGE_FRAVÆR, orgnr);
    }, 5000);
    return () => clearTimeout(timer);
  }, [orgnr]);
}
