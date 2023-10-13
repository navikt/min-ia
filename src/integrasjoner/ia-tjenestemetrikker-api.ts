import { METRIKKER_URL } from "../utils/konstanter";
import {
  MetrikkKilde,
  MetrikkType,
  sendIaMetrikk,
} from "@navikt/ia-metrikker-client";

export const sendIaTjenesteMetrikk = async (
  kilde: MetrikkKilde,
  orgnr?: string
) => {
  if (!orgnr) {
    return Promise.reject("orgnr er udefinert");
  }
  return sendIaMetrikk(
    orgnr,
    MetrikkType.DIGITAL_IA_TJENESTE,
    kilde,
    METRIKKER_URL
  );
};

export const sendSykefraværsstatistikkIaMetrikk = async (orgnr?: string) => {
  if (!orgnr) {
    return Promise.reject("orgnr er udefinert");
  }
  return sendIaMetrikk(
    orgnr,
    MetrikkType.DIGITAL_IA_TJENESTE,
    MetrikkKilde.SYKEFRAVÆRSSTATISTIKK,
    METRIKKER_URL
  );
};
