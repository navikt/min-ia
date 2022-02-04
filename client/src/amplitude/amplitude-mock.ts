import {AmplitudeClient, EventProperties} from "./client";

export const mockAmplitudeClient: AmplitudeClient = {
    setUserProperties(properties: any) {
        console.log("setUserProperties ble kalt med ", properties)
    },
    logEvent(eventName: string, eventProperties: EventProperties) {
        console.log("logEvent ble kalt med eventName ", eventName, " og eventProperties ", eventProperties)
    }
}