import logEvent from "./logEvent";

export const sendSidevisningEvent = () => {
  logEvent("sidevisning");
};

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift-valgt");
};

export const sendNettkursFilterValgtEvent = (filter: String) => {
  logEvent("nettkurs-filter-valgt", { filter: filter });
};

export const sendToggleEvent = (togglenavn: String, verdiValgt: String) => {
  logEvent("toggle", { togglenavn: togglenavn, verdiValgt: verdiValgt });
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
