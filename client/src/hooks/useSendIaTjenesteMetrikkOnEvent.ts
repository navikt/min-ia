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
      document.addEventListener(
        eventType,
        async () => {
          await sendLevertInnloggetIaTjeneste(IaTjeneste.NETTKURS, orgnr);
        },
        { once: true, capture: true }
      );
      eventListenerHarBlittSattOpp.current = true;
    }
  }, [eventType, orgnr]);
}
