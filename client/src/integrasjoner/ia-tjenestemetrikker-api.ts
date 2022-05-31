import { METRIKKER_BASE_PATH } from "../utils/konstanter";

interface IaTjenesteMetrikk {
  orgnr: String;
  altinnRettighet: String;
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
    altinnRettighet: "SYKEFRAVÆRSSTATISTIKK_FOR_VIRKSOMHETER",
  };
  return iaTjenesteMetrikk;
}

const tilIsoDatoMedUtcTimezoneUtenMillis = (dato: Date): String => {
  return dato.toISOString().split(".")[0] + "Z";
};

export const registrerLevertInnloggetIaTjeneste = async (
  orgnr: string,
  tjeneste: IaTjeneste
): Promise<boolean> => {
  if (orgnr === undefined) {
    return false;
  }

  const metrikk = byggIaTjenesteMottattMetrikk(orgnr, tjeneste);
  return await sendIaTjenesteMetrikk(metrikk);
};

const sendIaTjenesteMetrikk = async (
  levertIaTjeneste: IaTjenesteMetrikk
): Promise<boolean> => {
  const settings = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(levertIaTjeneste),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // @ts-ignore
    const res = await fetch(`${innloggetIaTjenestemetrikkPath}`, settings);
    const data = await res.json();
    return data.status === "created";
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    return false;
  }
};
