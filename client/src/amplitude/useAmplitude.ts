import {AmplitudeClient, EventProperties} from "./client";
import {useEffect} from "react";

interface AmplitudeData {
    eventName: string;
    eventProperties: EventProperties;
}

const AMPLITUDE_EVENT = 'amplitude';

export const useAmplitude = <T extends AmplitudeData>(client: AmplitudeClient) => {
    useEffect(() => {
        const listener = (event: Event) => {
            event.stopImmediatePropagation();
            let {
                detail: { eventProperties, eventName },
            } = event as CustomEvent<T>;
            client.logEvent(eventName, eventProperties);
        };
        document.addEventListener(AMPLITUDE_EVENT, listener);

        return () => {
            document.removeEventListener(AMPLITUDE_EVENT, listener);
        };
    }, [client]);
};

export const sendAmplitudeEvent = (eventData: AmplitudeData) => {
    const amplitudeEvent = new CustomEvent<AmplitudeData>(AMPLITUDE_EVENT, { detail: eventData });
    document.dispatchEvent(amplitudeEvent);
};
