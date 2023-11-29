import { METRIKKER_URL } from "../utils/konstanter";
import {
  MetrikkKilde,
  MetrikkType,
  sendIaMetrikk,
} from "@navikt/ia-metrikker-client";

export const sendDigitalIaTjenesteMetrikk = async (
  tjeneste: MetrikkKilde,
  orgnr?: string
) => {
  if (!orgnr) {
    return Promise.reject("orgnr er udefinert");
  }
  return sendIaMetrikk(
    orgnr,
    MetrikkType.DIGITAL_IA_TJENESTE,
    tjeneste,
    METRIKKER_URL
  );
};

export const sendIaMetrikkInteraksjonstjeneste = async (tjeneste: MetrikkKilde, orgnr?: string) => {
  if (!orgnr) {
    return Promise.reject("orgnr er udefinert");
  }
  return sendIaMetrikk(
    orgnr,
    MetrikkType.INTERAKSJONSTJENESTE,
    tjeneste,
    METRIKKER_URL
  );
};
