import * as amplitude from "@amplitude/analytics-browser";
import { track } from "@amplitude/analytics-browser";

export function initAmplitude() {
    amplitude.init(
        "default",
        undefined,
        {
            serverUrl: "https://amplitude.nav.no/collect-auto",
            autocapture: false,
            identityStorage: "localStorage",
            trackingOptions: {
                ipAddress: false,
            },
            ingestionMetadata: {
                sourceName: window.location.toString().split("?")[0].split("#")[0],
            },
        });
}

async function logAmplitudeEvent(event: string, data?: Record<string, unknown>): Promise<void> {
  try {
    track(event, { ...data });
  } catch (e) {
    console.error(e);
  }
}


export const sendToggleEvent = (togglename: string, label: string) => {
  logAmplitudeEvent("toggleGroup valgt", {
    togglenavn: togglename,
    verdiValgt: label,
  });
};
export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
  logAmplitudeEvent("textField utfylt", { label, name });
};
export const sendLesMerÅpnetEvent = (emne: string) => {
  logAmplitudeEvent("les mer åpnet", { emne: emne });
};
export const sendVisSamarbeidsstatusEvent = (status: string) => {
  logAmplitudeEvent("vis samarbeidsstatus", { status });
};

export const sendKnappEvent = (label: string) => {
  logAmplitudeEvent("knapp", { label });
};

export function sendToogleEvent(tekst: "graf" | "tabell") {
    logAmplitudeEvent("toogle", {tekst});
}

export function sendCheckboxLagtTil(label?: string) {
    logAmplitudeEvent("checkbox-lagt-til", {label});
}

export function sendCheckboxFjernet(label?: string) {
    logAmplitudeEvent("checkbox-fjernet", {label});
}

export function sendPanelEkspanderEvent(panelnavn: string) {
    logAmplitudeEvent("panel-ekspander", {panelnavn});
}

export function sendOppgaveStatusEvent(status: string, oppgavetittel: string) {
    logAmplitudeEvent("knapp", {status, oppgavetittel});
}

export function sendÅpneAktivitetEvent(oppgavetittel: string) {
    logAmplitudeEvent("Accordion åpnet", {tekst: oppgavetittel});
}

export const sendBedriftValgtEvent = () => {
    logAmplitudeEvent("bedrift valgt");
};