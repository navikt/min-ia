import { iaTjenesterMetrikkerApiEndpoint } from "../utils/environments";

interface IaTjenesteMetrikk {
  orgnr: String;
  altinnRettighet: String;
  type: String;
  kilde: String;
  tjenesteMottakkelsesdato: String;
}

enum IaTjeneste {
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
    altinnRettighet: "IKKE_SATT",
  };
  return iaTjenesteMetrikk;
}

const tilIsoDatoMedUtcTimezoneUtenMillis = (dato: Date): String => {
  return dato.toISOString().split(".")[0] + "Z";
};

const iaTjenesterSendtForBedrift: {
  orgnr: string;
  mottattTjeneste: IaTjeneste;
}[] = [];

const alleredeRegistrerteIaTjenester = (
  orgnr: string,
  tjeneste: IaTjeneste
): boolean => {
  return (
    iaTjenesterSendtForBedrift.find(
      (bedrift) =>
        bedrift.orgnr === orgnr && bedrift.mottattTjeneste === tjeneste
    ) != undefined
  );
};

export const registrerLevertIaTjeneste = async (
  orgnr: string,
  tjeneste: IaTjeneste
): Promise<boolean> => {
  if (alleredeRegistrerteIaTjenester(orgnr, tjeneste)) {
    return false;
  }
  const metrikk = byggIaTjenesteMottattMetrikk(orgnr, tjeneste);

  const isSent = await sendIaTjenesteMetrikk(metrikk);
  if (isSent) {
    console.info(
      "Sender ut IA-tjenestemetrikk med orgnr/tjeneste = ",
      orgnr,
      tjeneste
    );
    iaTjenesterSendtForBedrift.push({ orgnr, mottattTjeneste: tjeneste });
  }

  console.error(
    "Klarte ikke sende ut IA-tjenestemetrikk med orgnr/tjeneste = ",
    orgnr,
    tjeneste
  );
  return false;
};

export const sendIaTjenesteMetrikk = async (
  levertIaTjeneste: IaTjenesteMetrikk
): Promise<boolean> => {
  const settings = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(levertIaTjeneste),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  try {
    // @ts-ignore
    const res = await fetch(`${iaTjenesterMetrikkerApiEndpoint}`, settings);
    const data = await res.json();
    return data.status === "created";
  } catch (e) {
    return false;
  }
};
