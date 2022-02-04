import {sendAmplitudeEvent} from "./useAmplitude";

export const APP = 'min-ia';

export const sendSidevisningEvent = () => {
    console.log("TULL OG TØYS")
    sendAmplitudeEvent({
        eventName: 'sidevisning',
        eventProperties: {
            app: APP,
            url: window.location.pathname,
        },
    });
};