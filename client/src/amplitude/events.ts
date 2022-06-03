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
