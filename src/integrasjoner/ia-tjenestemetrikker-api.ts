import { AUTHENTICATED_BASE_PATH } from "../utils/konstanter";

interface Metrikk {
  orgnr: String;
  type: String;
  kilde: String;
}

const METRIKKER_URL = AUTHENTICATED_BASE_PATH + "/metrikker";

export const sendDigitalIaTjenesteMetrikk = async (orgnr?: string) => {
  if (!orgnr) {
    return Promise.reject("orgnr er udefinert");
  }

  const metrikk: Metrikk = {
    orgnr: orgnr,
    type: "DIGITAL_IA_TJENESTE",
    kilde: "FOREBYGGE_FRAVÆR",
  };

  return await fetch(METRIKKER_URL, {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(metrikk),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
