import logEvent from "./logEvent";

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift valgt");
};

export const sendNettkursFilterValgtEvent = (chipId: string, tekst: string) => {
  logEvent("chip valgt", { chipId: chipId, tekst: tekst });
};

export const sendToggleEvent = (togglename: string, label: string) => {
  logEvent("toggleGroup valgt", { togglenavn: togglename, verdiValgt: label });
};

export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
  logEvent("textField utfylt", { label, name });
};

export const sendLesMerÅpnetEvent = (emne: string) => {
  logEvent("les mer åpnet", { emne: emne });
};

export const sendVisSamarbeidsstatusEvent = (status: string) => {
  logEvent("vis samarbeidsstatus", { status });
};

export const sendNavigereEvent = (destinasjon: string, lenketekst: string) => {
  return logEvent("navigere", {
    destinasjon: destinasjon,
    lenketekst: lenketekst,
  });
};
