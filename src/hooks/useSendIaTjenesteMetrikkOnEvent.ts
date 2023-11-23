import { useOrgnr } from "./useOrgnr";
import { useEffect, useRef } from "react";
import { sendDigitalIaTjenesteMetrikk } from "../integrasjoner/ia-tjenestemetrikker-api";
import { MetrikkKilde } from "@navikt/ia-metrikker-client";

export function useSendIaTjenesteMetrikkOnEvent(
  fraIaTjeneste: MetrikkKilde,
  event: string
) {
  const orgnr = useOrgnr();
  const eventListenerHarBlittSattOpp = useRef(false);

  useEffect(() => {
    if (orgnr && !eventListenerHarBlittSattOpp.current) {
      const sendMetrikk = async () => {
        await sendDigitalIaTjenesteMetrikk(fraIaTjeneste, orgnr);
      };
      document.addEventListener(event, sendMetrikk, {
        once: true,
        capture: true,
      });
      eventListenerHarBlittSattOpp.current = true;

      return () => {
        document.removeEventListener(event, sendMetrikk);
      };
    }
  }, [fraIaTjeneste, event, orgnr]);
}
