import { useOrgnr } from "./useOrgnr";
import { useEffect, useRef } from "react";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";

export function useSendIaTjenesteMetrikkOnEvent(
  fraIaTjeneste: IaTjeneste,
  event: string
) {
  const orgnr = useOrgnr();
  const eventListenerHarBlittSattOpp = useRef(false);

  useEffect(() => {
    if (orgnr && !eventListenerHarBlittSattOpp.current) {
      const sendMetrikk = async () => {
        await sendLevertInnloggetIaTjeneste(fraIaTjeneste, orgnr);
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
