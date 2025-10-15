import { getAnalyticsInstance } from "@navikt/nav-dekoratoren-moduler";
import { PlanTema } from "../../komponenter/Plan/typer";

const track = getAnalyticsInstance("min-ia");

async function logAnalyticsEvent(event: string, data?: Record<string, unknown>): Promise<void> {
  try {
    track(event, { ...data });
  } catch (e) {
    console.error(e);
  }
}

export const sendToggleEvent = (togglename: string, label: string) => {
  logAnalyticsEvent("toggleGroup valgt", {
    togglenavn: togglename,
    verdiValgt: label,
  });
};
export const sendInputfeltUtfyltEvent = (label: string, name: string) => {
  logAnalyticsEvent("textField utfylt", { label, name });
};

export const sendVisSamarbeidsstatusEvent = (status: string) => {
  logAnalyticsEvent("vis samarbeidsstatus", { status });
};

export const sendKnappEvent = (label: string) => {
  logAnalyticsEvent("knapp", { label });
};

export function sendToogleEvent(tekst: "graf" | "tabell") {
    logAnalyticsEvent("toogle", {tekst});
}

export function sendCheckboxLagtTil(label?: string) {
    logAnalyticsEvent("checkbox-lagt-til", {label});
}

export function sendCheckboxFjernet(label?: string) {
    logAnalyticsEvent("checkbox-fjernet", {label});
}

export function sendPanelEkspanderEvent(panelnavn: string) {
    logAnalyticsEvent("panel-ekspander", {panelnavn});
}

export function sendOppgaveStatusEvent(status: string, oppgavetittel: string) {
    logAnalyticsEvent("knapp", {status, oppgavetittel});
}

export function sendÅpneAktivitetEvent(oppgavetittel: string, harFremgangIOppgaver: boolean) {
    logAnalyticsEvent("accordion åpnet", {tekst: oppgavetittel, harFremgangIOppgaver});
}

export function sendPlanUndertemaÅpnet(temanavn: string, status: PlanTema['undertemaer'][number]['status']) {
    logAnalyticsEvent("accordion åpnet", {tekst: temanavn, status});
}

export const sendBedriftValgtEvent = () => {
    logAnalyticsEvent("bedrift valgt");
};

export const sendNavigereEvent = (lenketekst: string, destinasjon: string) => {
    logAnalyticsEvent("navigere", {lenketekst, destinasjon});
};

export const sendSamarbeidValgtEvent = (status: string) => {
    logAnalyticsEvent("samarbeid valgt", {status});
}

export const sendFaneByttetEvent = (fraFane: string | null, tilFane: string) => {
    logAnalyticsEvent("fane byttet", {fraFane, tilFane});
}
