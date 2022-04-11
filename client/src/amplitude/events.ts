import logEvent from "./client";

export const APP = "min-ia";

export const sendSidevisningEvent = () => {
  logEvent("sidevisning", {
    app: APP,
    url: window.location.pathname,
  });
};

export const sendBedriftValgtEvent = () => {
  logEvent("bedrift-valgt", {
    app: APP,
    url: window.location.pathname,
  });
};
