import { METRIKKER_BASE_PATH } from "../utils/konstanter";

interface IaTjenesteMetrikk {
  orgnr: String;
  type: String;
  kilde: String;
  tjenesteMottakkelsesdato: String;
}

export const innloggetIaTjenestemetrikkPath = `${METRIKKER_BASE_PATH}/innlogget/mottatt-iatjeneste`;

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

const tilIsoDatoMedUtcTimezoneUtenMillis = (dato: Date): String => {
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
    credentials: "include",
    body: JSON.stringify(levertIaTjeneste),
    headers: {
      "Content-Type": "application/json",
    },
  };
  // @ts-ignore
  const res = await fetch(`${innloggetIaTjenestemetrikkPath}`, settings);
  const data = await res.json();
  return data.status === "created";
};
