import { useOrgnr } from "./useOrgnr";
import { useEffect, useRef } from "react";
import {
  IaTjeneste,
  sendLevertInnloggetIaTjeneste,
} from "../integrasjoner/ia-tjenestemetrikker-api";

export function useSendIaTjenesteMetrikkOnEvent(eventType: string) {
  const orgnr = useOrgnr();
  const metrikkErSendt = useRef(false);
  useEffect(() => {
    if (!metrikkErSendt.current) {
      document.addEventListener(
        eventType,
        async () => {
          await sendLevertInnloggetIaTjeneste(IaTjeneste.NETTKURS, orgnr);
        },
        { once: true }
      );
      metrikkErSendt.current = true;
    }
  }, [eventType, orgnr]);
}
