
import logEvent from "./logEvent";

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift valgt");
};

export const sendNettkursFilterValgtEvent = (chipId: string, tekst: String) => {
  logEvent("chip valgt", { chipId: chipId, tekst: tekst });
};

export const sendToggleEvent = (togglename: String, label: String) => {
  logEvent("toggleGroup valgt", { togglenavn: togglename, verdiValgt: label });
};

export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
  logEvent("textField utfylt", { label, name });
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
