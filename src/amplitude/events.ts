import logEvent from "./logEvent";

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift valgt");
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

export const sendKnappEvent = (label: string) => {
  logEvent("knapp", { label });
};

export function sendToogleEvent(tekst: "graf" | "tabell") {
  logEvent("toogle", { tekst });
}

export function sendCheckboxLagtTil(label?: string) {
  logEvent("checkbox-lagt-til", { label });
}

export function sendCheckboxFjernet(label?: string) {
  logEvent("checkbox-fjernet", { label });
}

export function sendPanelEkspanderEvent(panelnavn: string) {
  logEvent("panel-ekspander", { panelnavn });
}

export function sendOppgaveStatusEvent(status: string, oppgavetittel: string) {
  logEvent("knapp", { status, oppgavetittel });
}

export function sendÅpneAktivitetEvent(oppgavetittel: string) {
  logEvent("åpne", { oppgavetittel });
}
