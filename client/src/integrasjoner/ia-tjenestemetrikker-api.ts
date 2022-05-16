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
    altinnRettighet: "UKJENT",
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

const harAlleredeRegistrertIaTjeneste = (
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

export const registrerLevertInnloggetIaTjeneste = async (
  orgnr: string,
  tjeneste: IaTjeneste
): Promise<boolean> => {
  if (orgnr == undefined || harAlleredeRegistrertIaTjeneste(orgnr, tjeneste)) {
    console.log("Levert IA-tjeneste allerede registrert, sender ikke ut ny");
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
    return true;
    // iaTjenesterSendtForBedrift.push({ orgnr, mottattTjeneste: tjeneste });
  } else {
    console.error(
      "Klarte ikke sende ut IA-tjenestemetrikk med orgnr/tjeneste = ",
      orgnr,
      tjeneste
    );
  }
  return false;
};

const sendIaTjenesteMetrikk = async (
  levertIaTjeneste: IaTjenesteMetrikk
): Promise<boolean> => {
  console.log(`Sender levertIaTjeneste: ${JSON.stringify(levertIaTjeneste)}`);
  const settings = {
    method: "POST",
    credentials: "include",
    body: JSON.stringify(levertIaTjeneste),
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    console.log(
      `sendIaTjenesteMetrikk: Kjører fetch mot ${innloggetIaTjenestemetrikkPath} med ${JSON.stringify(
        settings
      )}`
    );
    console.log("Dette er LIKE FØR FETCH");
    // @ts-ignore
    const res = await fetch(`${innloggetIaTjenestemetrikkPath}`, settings);
    console.log("Dette er LIKE ETTER FETCH");
    const data = await res.json();
    return data.status === "created";
  } catch (error) {
    console.log("Inne i catch(error) i sendIaTjenesteMetrikk");
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    // we'll proceed, but let's report it
    reportError({ message });
    return false;
  }
};
