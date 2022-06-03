import logEvent from "./logEvent";

export const sendSidevisningEvent = () => {
  logEvent("sidevisning");
};

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift-valgt");
};

export const sendNavigereEvent = (
  destinasjon: string,
  lenketekst: string
): Promise<any> => {
  return logEvent("navigere", {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
  });
};

// Amplitude trenger litt tid for å sende ut event når vi navigerer til ekstern side/app.
const MAKS_VENTETID_MILLIS = 1000;
export const sendEventOgNaviger = (destinasjon: string, lenketekst: string) => {
  setTimeout(() => {
    window.location.href = destinasjon;
  }, MAKS_VENTETID_MILLIS);
  sendNavigereEvent(destinasjon, lenketekst).then(() => {
    window.location.href = destinasjon;
  });
};
