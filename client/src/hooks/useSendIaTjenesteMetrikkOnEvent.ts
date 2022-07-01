import { useOrgnr } from "./useOrgnr";
import { useEffect, useRef } from "react";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";

export function useSendIaTjenesteMetrikkOnEvent(eventType: string) {
  const orgnr = useOrgnr();
  const eventListenerHarBlittSattOpp = useRef(false);

  useEffect(() => {
    if (orgnr && !eventListenerHarBlittSattOpp.current) {
      const sendMetrikk = async () => {
        await sendLevertInnloggetIaTjeneste(IaTjeneste.NETTKURS, orgnr);
      };
      document.addEventListener(eventType, sendMetrikk, {
        once: true,
        capture: true,
      });
      eventListenerHarBlittSattOpp.current = true;

      return () => {
        document.removeEventListener(eventType, sendMetrikk);
      };
    }
  }, [eventType, orgnr]);
}
