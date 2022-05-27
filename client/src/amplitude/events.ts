import logEvent from "./logEvent";

export const sendSidevisningEvent = () => {
  logEvent("sidevisning");
};

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift-valgt");
};

export const sendLenkeKlikketPåEvent = (
  destinasjon: string,
  lenketekst: string
): Promise<any> => {
  return logEvent("navigere", {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
  });
};
