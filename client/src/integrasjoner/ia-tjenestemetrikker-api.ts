import { METRIKKER_URL } from "../utils/konstanter";

interface IaTjenesteMetrikk {
  orgnr: string;
  type: string;
  kilde: string;
  tjenesteMottakkelsesdato: string;
}

export enum IaTjeneste {
  FOREBYGGE_FRAVÆR = "FOREBYGGE_FRAVÆR",
  KALKULATOR = "KALKULATOR",
  NETTKURS = "NETTKURS",
}

function byggIaTjenesteMottattMetrikk(orgnr: string, forTjeneste: IaTjeneste) {
  const iaTjenesteMetrikk: IaTjenesteMetrikk = {
    orgnr: orgnr,
    kilde: forTjeneste,
    type: "DIGITAL_IA_TJENESTE",
    tjenesteMottakkelsesdato: tilIsoDatoMedUtcTimezoneUtenMillis(new Date()),
  };
  return iaTjenesteMetrikk;
}

const tilIsoDatoMedUtcTimezoneUtenMillis = (dato: Date): string => {
  return dato.toISOString().split(".")[0] + "Z";
};

export const sendLevertInnloggetIaTjeneste = async (
  tjeneste: IaTjeneste,
  orgnr: string | null
): Promise<boolean> => {
  if (!orgnr) {
    return Promise.reject("Orgnr er udefinert");
  }
  const metrikk = byggIaTjenesteMottattMetrikk(orgnr, tjeneste);
  return await post(metrikk);
};

const post = async (levertIaTjeneste: IaTjenesteMetrikk): Promise<boolean> => {
  const settings = {
    method: "POST",
    credentials: "include" as RequestCredentials,
    body: JSON.stringify(levertIaTjeneste),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(`${METRIKKER_URL}`, settings);
  const data = await res.json();
  return data.status === "created";
};
